'use client';

import { useState } from 'react';
import {
  IconButton,
  Box,
  Button,
  Heading,
  Icon,
  Input,
  Field,
  createListCollection,
} from '@chakra-ui/react';
import {
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CalendarCheck2,
  Wallet,
} from 'lucide-react';
import Sidebar from '@/components/ui/sidebar';
import StatsCard from '@/components/ui/stats-card';
import SelectFilter from '@/components/ui/select-filter';
import BarChart from '@/components/ui/bar-chart';
import LineChart from '@/components/ui/line-chart';
import TransactionTable from '@/components/ui/transaction-table';

import { useIsMobile } from '@/hooks/useIsMobile';
import { formatCurrencyBRL } from '@/lib/currency';
import { useTransactionsData } from '@/hooks/useTransactionsData';
import { useFilters } from '@/context/FilterContext';

export default function DashboardPage() {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  const { filters, setFilters } = useFilters();
  const {
    summaryData,
    isLoading,
    uniqueCollections,
    groupedByMonth,
    balanceOverTime,
    getLastTransactions,
  } = useTransactionsData();

  const accounts = createListCollection({
    items: uniqueCollections.accounts.map((a) => ({ label: a, value: a })),
  });
  const industries = createListCollection({
    items: uniqueCollections.industries.map((i) => ({ label: i, value: i })),
  });
  const states = createListCollection({
    items: uniqueCollections.states.map((s) => ({ label: s, value: s })),
  });

  return (
    <>
      {!isSidebarOpen && (
        <IconButton
          aria-label="Abrir menu"
          size="lg"
          variant="ghost"
          style={{ position: 'fixed', top: 24, left: 24, zIndex: 2000 }}
          onClick={() => setIsSidebarOpen(true)}
        >
          <ArrowRight />
        </IconButton>
      )}

      <Box display="flex" flexDirection="row" minH="100vh">
        {!isMobile && isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        <Box
          as="main"
          display="flex"
          flexDirection="column"
          gap={6}
          flex={1}
          width="100%"
          minH="100vh"
          p={4}
          maxW="66.66vw"
          mx="auto"
        >
          <Heading as="h1" size="2xl">
            Dashboard Financeiro
          </Heading>

          <Box
            as="section"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            gap={4}
            width="100%"
          >
            <StatsCard
              title="Depósitos"
              description="Depósitos no período"
              value={
                isLoading
                  ? '...'
                  : formatCurrencyBRL(summaryData?.deposits ?? 0)
              }
              icon={<Icon as={ArrowUp} color="green" size="md" />}
              color="green"
              flex={1}
            />
            <StatsCard
              title="Saques"
              description="Saques no período"
              value={
                isLoading
                  ? '...'
                  : formatCurrencyBRL(summaryData?.withdrawals ?? 0)
              }
              icon={<Icon as={ArrowDown} color="red" size="md" />}
              color="red"
              flex={1}
            />
            <StatsCard
              title="Pendências"
              description="Transações pendentes"
              value={isLoading ? '...' : String(summaryData?.pendingCount ?? 0)}
              icon={<Icon as={CalendarCheck2} color="yellow" size="md" />}
              color="yellow"
              flex={1}
            />
            <StatsCard
              title="Balanço"
              description="Saldo total"
              value={
                isLoading ? '...' : formatCurrencyBRL(summaryData?.balance ?? 0)
              }
              icon={<Icon as={Wallet} color="purple" size="md" />}
              color="purple"
              flex={1}
            />
          </Box>

          <Box
            as="section"
            display="block"
            width="100%"
            overflowX="auto"
            p={4}
            borderRadius="md"
            shadow="md"
            backgroundColor="white"
          >
            <Box
              display="flex"
              flexDirection="row"
              gap={4}
              alignItems="end"
              whiteSpace="nowrap"
            >
              <Field.Root flex={1} minW={120}>
                <Field.Label>Data inicial</Field.Label>
                <Input
                  type="date"
                  size="sm"
                  value={filters.startDateParam ?? ''}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      startDateParam: e.target.value || null,
                    }))
                  }
                />
              </Field.Root>

              <Field.Root flex={1} minW={120}>
                <Field.Label>Data final</Field.Label>
                <Input
                  type="date"
                  size="sm"
                  value={filters.endDateParam ?? ''}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      endDateParam: e.target.value || null,
                    }))
                  }
                />
              </Field.Root>

              <SelectFilter
                label="Conta"
                placeholder="Todas as contas"
                collection={accounts}
                value={filters.account}
                onChange={(val) => setFilters((f) => ({ ...f, account: val }))}
                size="sm"
                flex={1}
                minW={160}
              />

              <SelectFilter
                label="Indústrias"
                placeholder="Todas as indústrias"
                collection={industries}
                value={filters.industry}
                onChange={(val) => setFilters((f) => ({ ...f, industry: val }))}
                size="sm"
                flex={1}
                minW={160}
              />

              <SelectFilter
                label="Estado"
                placeholder="Todos os estados"
                collection={states}
                value={filters.state}
                onChange={(val) => setFilters((f) => ({ ...f, state: val }))}
                size="sm"
                flex={1}
                minW={140}
              />

              <Button
                variant="solid"
                bg="indigo"
                color="white"
                size="sm"
                flex={1}
                minW={100}
                onClick={() =>
                  setFilters({
                    startDateParam: null,
                    endDateParam: null,
                    account: null,
                    industry: null,
                    state: null,
                  })
                }
              >
                Limpar
              </Button>
            </Box>
          </Box>

          <Box
            as="section"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <BarChart
              groupedByMonth={groupedByMonth}
              title="Depósitos x Saques"
              flex={1}
              isLoading={isLoading}
            />
            <LineChart
              data={balanceOverTime}
              title="Saldo Acumulado"
              flex={1}
              isLoading={isLoading}
            />
          </Box>

          <Box
            as="section"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            gap={4}
          >
            <TransactionTable
              transactions={getLastTransactions(10)}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>

      {isMobile && isSidebarOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          zIndex={1200}
          bg="rgba(0,0,0,0.4)"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            width="80vw"
            maxWidth="250px"
            height="100vh"
            bg="white"
            boxShadow="lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
