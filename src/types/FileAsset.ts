import { BooleanString, PaginationArgs, QueryResult } from './base';

export type FileAsset = {
  id: string;
  source_id?: string;
  content_type?: number;
  name: string;
  category: string;
  path: string | File;
  observations?: string;
};

export type FileAssetResult = QueryResult<FileAsset>;

export type FileAssetArgs = PaginationArgs & {
  search?: string;
  sourceId?: string;
  name?: string;
  isActive?: BooleanString;
};
