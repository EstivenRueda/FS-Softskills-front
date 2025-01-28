import { BooleanString, PaginationArgs, QueryResult } from '@/types';
import { GrupoCuestionario } from './GrupoCuestionario';

export type GrupoCuestionariosResult = QueryResult<GrupoCuestionario>;

export type GrupoCuestionariosArgs = PaginationArgs & {
  attendeeId?: string;
  isCurrent?: BooleanString;
  isActive?: BooleanString;
};
