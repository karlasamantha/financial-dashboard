'use client';

import { Box, Heading } from '@chakra-ui/react';
import { Chart, useChart } from '@chakra-ui/charts';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
} from 'recharts';
import { ResponsiveContainer } from 'recharts';
import { formatCurrencyBRL } from '@/lib/currency';

interface BarChartProps {
  groupedByMonth: Array<{
    month: string;
    deposits: number;
    withdrawals: number;
  }>;
  flex?: number;
  title: string;
  isLoading?: boolean;
}

export default function BarChart({
  groupedByMonth,
  flex,
  title,
  isLoading = false,
}: BarChartProps) {
  const seriesLabels: Record<string, string> = {
    deposits: 'Depósitos',
    withdrawals: 'Saques',
  };

  const chart = useChart({
    data: groupedByMonth,
    series: [
      {
        name: 'deposits',
        color: 'var(--chakra-colors-green)',
        stackId: 'transactions',
      },
      {
        name: 'withdrawals',
        color: 'var(--chakra-colors-red)',
        stackId: 'transactions',
      },
    ],
  });

  return (
    <Box
      flex={flex}
      borderRadius="md"
      bg="white"
      p={4}
      shadow="md"
      overflow="hidden"
    >
      <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Heading>
      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="200px"
        >
          Carregando...
        </Box>
      ) : (
        <Chart.Root maxH="md" chart={chart}>
          <ResponsiveContainer>
            <RechartsBarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrencyBRL(Number(value)),
                  seriesLabels[name as string] || name,
                ]}
              />
              <Legend
                formatter={(_value) => seriesLabels[_value as string] || _value}
              />
              {chart.series.map((item) => (
                <Bar
                  key={item.name}
                  dataKey={chart.key(item.name)}
                  fill={chart.color(item.color)}
                  stackId={item.stackId}
                ></Bar>
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </Chart.Root>
      )}
    </Box>
  );
}
