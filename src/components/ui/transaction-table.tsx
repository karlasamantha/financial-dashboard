import { Box, Text, useBreakpointValue, Table } from '@chakra-ui/react';

interface Transaction {
  date: number;
  amount: string;
  transaction_type: 'withdraw' | 'deposit';
  currency: string;
  account: string;
  industry: string;
  state: string;
  amountFormatted: number;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box w="100%" borderRadius="md" bg="white" shadow="md" p={4}>
      <Text fontWeight="bold" fontSize="lg" mb={4}>
        Últimas transações
      </Text>

      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row bg="indigo.100">
            <Table.ColumnHeader>Data</Table.ColumnHeader>
            {!isMobile && <Table.ColumnHeader>Conta</Table.ColumnHeader>}
            {!isMobile && <Table.ColumnHeader>Indústria</Table.ColumnHeader>}
            {!isMobile && <Table.ColumnHeader>Estado</Table.ColumnHeader>}
            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Valor</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={6} textAlign="center">
                Nenhuma transação encontrada.
              </Table.Cell>
            </Table.Row>
          )}
          {transactions.map((t, idx) => (
            <Table.Row key={idx}>
              <Table.Cell>{new Date(t.date).toLocaleDateString()}</Table.Cell>
              {!isMobile && <Table.Cell>{t.account}</Table.Cell>}
              {!isMobile && <Table.Cell>{t.industry}</Table.Cell>}
              {!isMobile && <Table.Cell>{t.state}</Table.Cell>}
              <Table.Cell
                color={t.transaction_type === 'deposit' ? 'green' : 'red'}
                fontWeight="bold"
              >
                {t.transaction_type === 'deposit' ? 'Depósito' : 'Saque'}
              </Table.Cell>
              <Table.Cell textAlign="end">
                {t.amountFormatted.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: t.currency || 'BRL',
                })}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
