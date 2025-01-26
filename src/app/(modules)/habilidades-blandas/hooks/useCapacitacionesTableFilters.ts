import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState, useIsViewPage } from '@/hooks';

export type CapacitacionesTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function useCapacitacionesTableFilters({ onFilterChange }: CapacitacionesTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });
  const isViewPage = useIsViewPage();

  return {
    formContext,
    handleReset,
    isViewPage,
  };
}
