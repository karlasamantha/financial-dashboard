'use client';

import React from 'react';
import useSWR from 'swr';
import { useFilters } from '@/context/FilterContext';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Transaction {
  date: number;
  amount: string;
  transaction_type: 'withdraw' | 'deposit';
  currency: string;
  account: string;
  industry: string;
  state: string;
}

interface TransactionWithFormattedAmount extends Transaction {
  amountFormatted: number;
}

export function useTransactionsData() {
  const { filters } = useFilters();
  const { startDateParam, endDateParam, account, industry, state } = filters;

  const [allDataCache, setAllDataCache] = React.useState<Transaction[] | null>(
    null
  );

  const endpoint = `/api/data`;
  const { data, error, isLoading, mutate } = useSWR<{
    data: Transaction[];
  }>(endpoint, fetcher, { dedupingInterval: 3600 * 1000 });

  React.useEffect(() => {
    if (
      data?.data &&
      !startDateParam &&
      !endDateParam &&
      !account &&
      !industry &&
      !state
    ) {
      setAllDataCache(data.data);
    }
  }, [data, startDateParam, endDateParam, account, industry, state]);

  // Aplicar filtros do dashboard
  const filteredTransactions = React.useMemo(() => {
    // Se não há filtros ativos, use o cache local se disponível
    const noFilters =
      !startDateParam && !endDateParam && !account && !industry && !state;
    const baseData = noFilters
      ? allDataCache || data?.data || []
      : data?.data || [];
    if (!baseData) return [];

    return baseData.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();

      const startTimestamp = startDateParam
        ? new Date(startDateParam).getTime()
        : null;
      const endTimestamp = endDateParam
        ? new Date(endDateParam).getTime() + (24 * 60 * 60 * 1000 - 1)
        : null;

      const inRange =
        (!startTimestamp || transactionDate >= startTimestamp) &&
        (!endTimestamp || transactionDate <= endTimestamp);
      const byAccount = !account || transaction.account === account;
      const byIndustry = !industry || transaction.industry === industry;
      const byState = !state || transaction.state === state;
      return inRange && byAccount && byIndustry && byState;
    });
  }, [
    data,
    allDataCache,
    startDateParam,
    endDateParam,
    account,
    industry,
    state,
  ]);

  // Cálculo de resumo de cada transação
  const summaryData = React.useMemo(() => {
    let deposits = 0,
      withdrawals = 0,
      pendingCount = 0;

    filteredTransactions.forEach(({ amount, transaction_type }) => {
      const val = parseInt(amount as string, 10) / 100;
      if (amount === '0') {
        pendingCount++;
      } else if (transaction_type === 'deposit') {
        deposits += val;
      } else if (transaction_type === 'withdraw') {
        withdrawals += Math.abs(val);
      }
    });
    return {
      deposits,
      withdrawals,
      balance: deposits - withdrawals,
      pendingCount,
    };
  }, [filteredTransactions]);

  // Listas únicas para filtros dinâmicos, de contas, indústrias e estados
  const uniqueCollections = React.useMemo(
    () => ({
      accounts: Array.from(
        new Set((data?.data ?? []).map((type) => type.account))
      ),
      industries: Array.from(
        new Set((data?.data ?? []).map((type) => type.industry))
      ),
      states: Array.from(new Set((data?.data ?? []).map((type) => type.state))),
    }),
    [data]
  );

  // Agrupamento por mês
  const groupedByMonth = React.useMemo(() => {
    const months = {} as Record<
      string,
      { deposits: number; withdrawals: number }
    >;

    filteredTransactions.forEach(({ date, amount, transaction_type }) => {
      const value = parseInt(amount as string, 10) / 100;
      if (isNaN(value) || value === 0) return;

      const transactionDate = new Date(date);
      const key = `${transactionDate.getFullYear()}-${String(
        transactionDate.getMonth() + 1
      ).padStart(2, '0')}`;

      months[key] = months[key] || { deposits: 0, withdrawals: 0 };
      if (transaction_type === 'deposit') months[key].deposits += value;
      else if (transaction_type === 'withdraw')
        months[key].withdrawals += Math.abs(value);
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, vals]) => ({ month, ...vals }));
  }, [filteredTransactions]);

  // Versão limitada para gráfico: últimos 12 meses
  const groupedByMonthChart = React.useMemo(() => {
    return groupedByMonth.slice(-12);
  }, [groupedByMonth]);

  // Saldo acumulado ao longo do tempo
  const balanceOverTime = React.useMemo(() => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      const transactionDateA = new Date(a.date).getTime();
      const transactionDateB = new Date(b.date).getTime();
      return transactionDateA - transactionDateB;
    });

    let accumulatedBalance = 0;
    return sorted.map(({ date, amount, transaction_type }) => {
      const value = parseInt(amount as string, 10) / 100;
      if (transaction_type === 'deposit') accumulatedBalance += value;
      else if (transaction_type === 'withdraw')
        accumulatedBalance -= Math.abs(value);

      const formattedDate = new Date(date).toISOString().split('T')[0];
      return { date: formattedDate, balance: accumulatedBalance };
    });
  }, [filteredTransactions]);

  // Versão limitada para gráfico: últimos 365 dias
  const balanceOverTimeChart = React.useMemo(() => {
    return balanceOverTime.slice(-365);
  }, [balanceOverTime]);

  // Retorna as n últimas transações filtradas, ordenadas por data decrescente
  function getLastTransactions(n: number): TransactionWithFormattedAmount[] {
    return [...filteredTransactions]
      .sort((a, b) => b.date - a.date)
      .slice(0, n)
      .map((transaction) => ({
        ...transaction,
        amountFormatted: parseInt(transaction.amount, 10) / 100,
      }));
  }

  // Paginação client-side
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20); //20 por página por padrão

  const totalPages = Math.ceil(filteredTransactions.length / pageSize);

  const paginatedItems = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredTransactions.slice(start, end).map((transaction) => ({
      ...transaction,
      amountFormatted: parseInt(transaction.amount, 10) / 100,
    }));
  }, [filteredTransactions, currentPage, pageSize]);

  return {
    items: filteredTransactions,
    paginatedItems,
    isLoading,
    error,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    summaryData,
    uniqueCollections,
    groupedByMonth,
    groupedByMonthChart,
    balanceOverTime,
    balanceOverTimeChart,
    getLastTransactions,
    mutate,
  };
}
