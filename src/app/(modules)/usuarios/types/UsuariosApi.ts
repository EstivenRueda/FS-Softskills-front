import { BooleanString, PaginationArgs, QueryResult } from '@/types';
import { Usuario } from './Usuarios';

export type UsuariosResult = QueryResult<Usuario>;

export type UsuariosArgs = PaginationArgs & {
  search?: string;
  isActive?: BooleanString;
};
