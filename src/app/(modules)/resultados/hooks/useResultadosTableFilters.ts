import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState } from '@/hooks';

export type ResultadosTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function useResultadosTableFilters({ onFilterChange }: ResultadosTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });

  return {
    formContext,
    handleReset,
  };
}
