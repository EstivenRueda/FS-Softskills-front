import { BooleanString, PaginationArgs, QueryResult } from "@/types";
import { HabilidadBlanda } from "./HabilidadesBlandas";

export type HabilidadBlandasResult = QueryResult<HabilidadBlanda>

export type HabilidadBlandaArgs = PaginationArgs & {
  search?: string;
  isActive?: BooleanString
}
