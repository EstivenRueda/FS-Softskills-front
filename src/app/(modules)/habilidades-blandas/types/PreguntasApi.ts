import { BooleanString, PaginationArgs, QueryResult } from '@/types';
import { Pregunta } from './Preguntas';

export type PreguntasResult = QueryResult<Pregunta>;

export type PreguntasArgs = PaginationArgs & {
  search?: string;
  isActive?: BooleanString;
  softskillId? : string;
};
