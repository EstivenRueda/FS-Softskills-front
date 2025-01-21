import { useEffect, useRef, useState } from 'react';
import type { GridInitialState, GridEvents } from '@mui/x-data-grid';
import type { GridFilterItem, GridFilterModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { useGridApiRef } from '@mui/x-data-grid';
import type { QueryDefinition } from '@reduxjs/toolkit/query';
import { isEmpty } from 'lodash';
import { useDebouncedCallback } from 'use-debounce';
import { useForm } from '@/components';
import type { QueryOptions } from '@/types';
import { getItemsFilterValues, LocalStorage } from '@/utils';
import { TypedUseQuery } from '@reduxjs/toolkit/query/react';

export type UseDataGridStateOptions = {
  stateKey: string;
};

/**
 * Listens to column-related changes on grid, and saves column settings to local storage.
 * Restores settings upon reload.
 * Docs: https://mui.com/x/react-data-grid/state/#save-and-restore-the-state
 * SO: https://stackoverflow.com/a/75090454/207291
 * Usage:
 *
 * ```jsx
 * function MyGrid() {
 *   const { apiRef, initialState } = useDataGridState('customers-grid');
 *   return <DataGrid apiRef={apiRef} initialState={initialState} />
 * }
 * ```
 */
export function useDataGridState(options: UseDataGridStateOptions) {
  const { stateKey } = options;
  const initialized = useRef(false);
  const apiRef = useGridApiRef();
  const [initialState, setInitialState] = useState<GridInitialState>({ columns: { columnVisibilityModel: {} } });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const [queryOptions, setQueryOptions] = useState<QueryOptions>({});

  const handleFilterModelChange = useDebouncedCallback((filterModel: GridFilterModel) => {
    setQueryOptions({ filterModel: { ...filterModel } });
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  }, 500);

  const handleRowSelectionModelChange = (newSelectionModel: GridRowSelectionModel) => {
    setRowSelectionModel(newSelectionModel);
  };

  useEffect(() => {
    const ref = apiRef.current;

    if (!ref?.subscribeEvent) return;

    // Restore state on first ref load
    if (!initialized.current) {
      initialized.current = true;
      try {
        const state = LocalStorage.getItem(stateKey) ?? {};
        // console.debug(`Restoring grid state for ${stateKey}`, state);
        ref.restoreState(state);
      } catch (e) {
        console.warn(`Failed to restore grid state`, e);
      }
    }

    const subscriptions: VoidFunction[] = [];

    const persist = () => {
      const state = ref.exportState();
      if (state) {
        // console.debug(`Storing grid state for ${stateKey}`, state);
        if (state.preferencePanel) delete state.preferencePanel;
        if (state.filter) delete state.filter;
        if (state.sorting) delete state.sorting;
        LocalStorage.set(stateKey, state);
      }
    };

    const subscribe = <E extends GridEvents>(event: E) => {
      subscriptions.push(ref.subscribeEvent(event, persist));
    };

    subscribe('columnVisibilityModelChange');
    subscribe('paginationModelChange');

    return () => {
      subscriptions.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [apiRef, stateKey]);

  return {
    apiRef,
    initialState,
    paginationModel,
    setPaginationModel,
    rowSelectionModel,
    setRowSelectionModel,
    queryOptions,
    setQueryOptions,
    handleFilterModelChange,
    handleRowSelectionModelChange,
  };
}

export type UseDataGridStateQueryOptions = UseDataGridStateOptions & {
  stateKey: string;
  useRetrieveQuery: TypedUseQuery<any, any, any>;
  queryArgs?: Record<string, unknown>;
};

export function useDataGridStateQuery(options: UseDataGridStateQueryOptions) {
  const { stateKey, useRetrieveQuery, queryArgs } = options;
  const gridState = useDataGridState({ stateKey });
  const { data, refetch, isLoading, isFetching } = useRetrieveQuery({
    ...gridState.paginationModel,
    ...getItemsFilterValues(gridState.queryOptions),
    ...queryArgs,
  });
  const { rowCountState } = useDataGridCountState(data?.count);

  return {
    ...gridState,
    rowCountState,
    data,
    refetch,
    isLoading: isLoading || isFetching,
  };
}

export function useDataGridCountState(count?: number) {
  const [rowCountState, setRowCountState] = useState(count || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState: number) => (count !== undefined ? count : prevRowCountState));
  }, [count, setRowCountState]);

  return { rowCountState };
}

export type DataGridFilterStateOptions = {
  onFilterChange?: (filterModel: GridFilterModel) => void;
};

export function useDataGridFilterState(options: DataGridFilterStateOptions) {
  const { onFilterChange } = options;
  const formContext = useForm();

  useEffect(() => {
    const subscription = formContext.watch((value, { name, type }) => {
      let items: GridFilterItem[] = [];
      if (!isEmpty(value)) {
        items = Object.entries(value).map(([key, item]) => ({
          field: key,
          operator: 'equals',
          value: item,
        }));

        onFilterChange?.({ items });
      } else if (isEmpty(value) && isEmpty(name)) {
        onFilterChange?.({ items }); // Handle reset filters
      }
    });
    return () => subscription.unsubscribe();
  }, [formContext, formContext.watch, onFilterChange]);

  const handleReset = () => {
    formContext.reset();
  };

  return { formContext, handleReset };
}
