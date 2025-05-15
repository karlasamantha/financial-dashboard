'use client';

import useSWR from 'swr';
import { useFilters } from '@/context/FilterContext';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Transaction {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export function useTransactionsData() {
  const { filters } = useFilters();
  const { startDateParam, endDateParam, account, industry, state } = filters;

  const params = new URLSearchParams();
  if (startDateParam) params.set('startDateParam', startDateParam);
  if (endDateParam) params.set('endDateParam', endDateParam);
  if (account) params.set('account', account);
  if (industry) params.set('industry', industry);
  if (state) params.set('state', state);

  const endpoint = `/api/data?${params.toString()}`;

  const { data, error, isLoading } = useSWR<{
    data: Transaction[];
    total: number;
  }>(endpoint, fetcher);

  return {
    items: data?.data ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
}
