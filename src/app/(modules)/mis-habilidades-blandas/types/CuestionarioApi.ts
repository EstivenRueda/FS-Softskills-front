import { BooleanString, PaginationArgs, QueryResult } from '@/types';
import { Cuestionario } from './Cuestionario';

export type CuestionariosResult = QueryResult<Cuestionario>;

export type CuestionariosArgs = PaginationArgs & {
  softskillId?: string;
  attendeeId?: string;
  isCurrent?: BooleanString;
  isActive?: BooleanString;
};
