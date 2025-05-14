'use client';

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export interface Filters {
  startDateString: string | null;
  endDateString: string | null;
  account: string | null;
  industry: string | null;
  state: string | null;
}

interface FilterContextValue {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}

const defaultFilters: Filters = {
  startDateString: null,
  endDateString: null,
  account: null,
  industry: null,
  state: null,
};

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useLocalStorage<Filters>(
    'dashboard-filters',
    defaultFilters
  );

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error('useFilters should be used within a FilterProvider');
  return ctx;
}
