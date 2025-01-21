import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState } from '@/hooks';

export type HabilidadesBlandasTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function useHabilidadesBlandasTableFilters({ onFilterChange }: HabilidadesBlandasTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });

  return {
    formContext,
    handleReset,
  };
}
