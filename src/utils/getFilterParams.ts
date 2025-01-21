import { produce } from 'immer';
import { snakeCase, isNil } from 'lodash';

export type FilterParamsOptions = {
  disablePagination?: boolean;
};

export function getFilterParams(params: Record<string, string>, options?: FilterParamsOptions) {
  const disablePagination = options?.disablePagination ?? false;

  const finalParams = produce(params, (draft) => {
    if (disablePagination) {
      delete draft['pageSize'];
      delete draft['page'];
    }
  });

  const filterParams = Object.entries(finalParams)
    .filter(([_, value]) => !isNil(value))
    .map(([key, value]) => [snakeCase(key), value]); // TODO: Add uri encoding to values
  const searchParams = new URLSearchParams(filterParams).toString();
  return searchParams ? `&${searchParams}` : '';
}
