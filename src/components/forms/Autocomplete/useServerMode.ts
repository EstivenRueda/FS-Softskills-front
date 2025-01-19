import { useState, type SyntheticEvent } from 'react';
import type { TypedUseQuery } from '@reduxjs/toolkit/query/react';
import { useDebounce } from 'use-debounce';
import type { SelectOption } from '@/types';

export type UseServerModeOptions = {
  useRetrieveQuery: TypedUseQuery<any, any, any>;
  labelKey: string | string[];
  labelSeparator: string;
  dataKey?: string;
  queryArgs?: {
    page?: number;
    pageSize?: number;
    searchType?: 'full' | 'autocomplete';
    search?: string;
    [key: string]: any;
  };
};

export function useServerMode(options: UseServerModeOptions) {
  const { useRetrieveQuery, dataKey, labelKey, labelSeparator, queryArgs } = options;
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const queryResult = useRetrieveQuery?.({
    page: 0,
    pageSize: 25,
    searchType: 'autocomplete',
    ...queryArgs,
    search: debouncedSearch,
  });
  const serverOptions = (dataKey ? queryResult?.data?.[dataKey] : queryResult?.data) || [];
  const serverLoading = queryResult?.isLoading || queryResult?.isFetching;
  const serverProps = !!useRetrieveQuery
    ? {
        filterOptions(o: SelectOption[]) {
          return o;
        },
        onInputChange(event: SyntheticEvent, value: string) {
          const searchValue = (Array.isArray(labelKey) ? value.split(labelSeparator).pop() : value) as string;
          setSearch(searchValue);
        },
      }
    : {};

  return {
    serverOptions,
    serverLoading,
    serverProps,
  };
}
