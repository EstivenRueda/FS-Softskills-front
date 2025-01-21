import type { GridFilterItem } from '@mui/x-data-grid';
import { useDataGridFilterState } from '@/hooks';

export type PreguntasTableFiltersOptions = {
  onFilterChange?: (filters: { items: GridFilterItem[] }) => void;
};

export function usePreguntasTableFilters({ onFilterChange }: PreguntasTableFiltersOptions) {
    const { formContext, handleReset } = useDataGridFilterState({ onFilterChange });

    return {
      formContext,
      handleReset,
    };
}
