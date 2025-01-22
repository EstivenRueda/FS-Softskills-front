import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState } from '@/hooks';

export type CapacitacionesTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function useCapacitacionesTableFilters({ onFilterChange }: CapacitacionesTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });

  return {
    formContext,
    handleReset,
  };
}
