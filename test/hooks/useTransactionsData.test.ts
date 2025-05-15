// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { renderHook } from '@testing-library/react';
import * as swr from 'swr';
import * as FilterContext from '../../src/context/FilterContext';
import { useTransactionsData } from '../../src/hooks/useTransactionsData';

jest.mock('swr');

const mockFilters = {
  filters: {
    startDateParam: null,
    endDateParam: null,
    account: null,
    industry: null,
    state: null,
  },
};

const mockTransactions = [
  {
    date: 1715731200000,
    amount: '10000',
    transaction_type: 'deposit',
    currency: 'USD',
    account: 'A',
    industry: 'Tech',
    state: 'TX',
  },
  {
    date: 1715817600000,
    amount: '5000',
    transaction_type: 'withdraw',
    currency: 'USD',
    account: 'A',
    industry: 'Tech',
    state: 'TX',
  },
  {
    date: 1715904000000,
    amount: '0',
    transaction_type: 'deposit',
    currency: 'USD',
    account: 'B',
    industry: 'Finance',
    state: 'NY',
  },
];

describe('useTransactionsData', () => {
  beforeEach(() => {
    jest.spyOn(FilterContext, 'useFilters').mockReturnValue(mockFilters);
  });

  it('should return filtered transactions and summary data', () => {
    jest.spyOn(swr, 'default').mockReturnValue({ data: { data: mockTransactions }, error: undefined, isLoading: false });
    const { result } = renderHook(() => useTransactionsData());
    expect(result.current.items.length).toBe(3);
    expect(result.current.summaryData).toEqual({
      deposits: 100,
      withdrawals: 50,
      balance: 50,
      pendingCount: 1,
    });
  });

  it('should return unique collections', () => {
    jest.spyOn(swr, 'default').mockReturnValue({ data: { data: mockTransactions }, error: undefined, isLoading: false });
    const { result } = renderHook(() => useTransactionsData());
    expect(result.current.uniqueCollections.accounts).toEqual(['A', 'B']);
    expect(result.current.uniqueCollections.industries).toEqual(['Tech', 'Finance']);
    expect(result.current.uniqueCollections.states).toEqual(['TX', 'NY']);
  });

  it('should group transactions by month', () => {
    jest.spyOn(swr, 'default').mockReturnValue({ data: { data: mockTransactions }, error: undefined, isLoading: false });
    const { result } = renderHook(() => useTransactionsData());
    expect(result.current.groupedByMonth).toEqual([
      { month: '2024-05', deposits: 100, withdrawals: 50 },
    ]);
  });

  it('should calculate balance over time', () => {
    jest.spyOn(swr, 'default').mockReturnValue({ data: { data: mockTransactions }, error: undefined, isLoading: false });
    const { result } = renderHook(() => useTransactionsData());
    expect(result.current.balanceOverTime).toEqual([
      { date: '2024-05-15', balance: 100 },
      { date: '2024-05-16', balance: 50 },
      { date: '2024-05-17', balance: 50 },
    ]);
  });

  it('should return last N transactions', () => {
    jest.spyOn(swr, 'default').mockReturnValue({ data: { data: mockTransactions }, error: undefined, isLoading: false });
    const { result } = renderHook(() => useTransactionsData());
    const last = result.current.getLastTransactions(2);
    expect(last.length).toBe(2);
    const amounts = last.map(t => t.amount);
    expect(amounts).toEqual(expect.arrayContaining(['0', '5000']));
  });

  it('should handle loading and error states', () => {
    jest.spyOn(swr, 'default').mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: jest.fn(),
      isValidating: false,
    });
    const { result } = renderHook(() => useTransactionsData());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.items).toEqual([]);

    jest.spyOn(swr, 'default').mockReturnValue({
      data: undefined,
      error: 'error',
      isLoading: false,
      mutate: jest.fn(),
      isValidating: false,
    });
    const { result: result2 } = renderHook(() => useTransactionsData());
    expect(result2.current.error).toBe('error');
  });
});
