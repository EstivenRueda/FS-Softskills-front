import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState, useIsViewPage } from '@/hooks';

export type UsuariosTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function useUsuariosTableFilters({ onFilterChange }: UsuariosTableFiltersOptions) {
  const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });
  const isViewPage = useIsViewPage();

  return {
    formContext,
    handleReset,
    isViewPage,
  };
}
