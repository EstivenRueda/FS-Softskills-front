import { BooleanString, PaginationArgs, QueryResult } from '@/types';
import { Capacitacion } from './Capacitaciones';

export type CapacitacionesResult = QueryResult<Capacitacion>;

export type CapacitacionesArgs = PaginationArgs & {
  search?: string;
  isActive?: BooleanString;
  softskillId?: string;
};
