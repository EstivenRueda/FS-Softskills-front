import type { QueryOptions } from '@/types';

export function getItemsFilterValues(queryOptions: QueryOptions): Partial<any> {
  const itemEntries = queryOptions?.filterModel?.items
    ?.filter((item) => item.value)
    ?.map((item) => [item.field, item.value]);

  return Object.fromEntries(itemEntries || []);
}
