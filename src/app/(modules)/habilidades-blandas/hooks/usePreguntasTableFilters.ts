import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState, useIsViewPage } from '@/hooks';

export type PreguntasTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function usePreguntasTableFilters({ onFilterChange }: PreguntasTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });
  const isViewPage = useIsViewPage();

  return {
    formContext,
    handleReset,
    isViewPage,
  };
}
