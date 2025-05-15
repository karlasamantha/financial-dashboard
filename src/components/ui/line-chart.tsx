'use client';

import { Box, Heading } from '@chakra-ui/react';
import { Chart, useChart } from '@chakra-ui/charts';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface LineChartProps {
  data: Array<{ date: string; balance: number }>;
  title: string;
  flex?: number;
}

export default function LineChart({ data, title, flex = 1 }: LineChartProps) {
  const chart = useChart({
    data,
    series: [{ name: 'balance', color: 'purple' }],
  });

  return (
    <Box flex={flex} bg="white" p={4} borderRadius="md" boxShadow="md">
      <Box mb={4}>
        <Heading as="h3" fontSize="xl" fontWeight="bold">
          {title}
        </Heading>
      </Box>

      <Chart.Root maxH="sm" chart={chart}>
        <RechartsLineChart data={chart.data}>
          <CartesianGrid stroke={chart.color('border')} vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={chart.key('date')}
            tickFormatter={(value) => {
              if (typeof value === 'string' && value.length >= 10) {
                const [, month, day] = value.split('-');
                return `${day}/${month}`;
              }
              return value;
            }}
            stroke={chart.color('border')}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tickFormatter={chart.formatNumber({
              style: 'currency',
              currency: 'BRL',
              notation: 'compact',
            })}
            stroke={chart.color('border')}
          />
          <Tooltip
            animationDuration={100}
            cursor={false}
            content={<Chart.Tooltip />}
          />
          <Legend
            formatter={() => 'Saldo Acumulado'}
            content={<Chart.Legend />}
          />
          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              fill={chart.color(item.color)}
              stroke={chart.color(item.color)}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </Chart.Root>
    </Box>
  );
}
