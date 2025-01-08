import type { GridFilterModel } from '@mui/x-data-grid';
import type { MenuAction } from '@/components';

export type Environment = 'development' | 'production';

export type ParamsWithId = {
  id: string;
};

export type ParamsWithSlug = {
  slug: string;
};

export type ParamsWithContentTypeId = {
  contentTypeId: string;
};

export type BooleanString = 'true' | 'false';

export type SelectOption = {
  id: string | number;
  label: string | number;
  disabled?: boolean;
};

export type QueryOptions = {
  filterModel?: GridFilterModel;
};

export type QueryResult<T> = {
  active_count: number;
  count: number;
  inactive_count: number;
  next: string;
  previous: string;
  results: T[];
  content_type?: number;
};

export type PaginationArgs = {
  page: number;
  pageSize: number;
  search?: string;
  name?: string;
};

export type TableActionsFn<T> = (record: T) => MenuAction[];

export type DownloadResult = {
  data: Blob;
  filename: string;
};

export type ContentType = {
  id: number;
  app_label: string;
  model: string;
};
