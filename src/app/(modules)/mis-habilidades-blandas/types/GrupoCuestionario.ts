import { CuestionarioResult } from './Cuestionario';

export type GrupoCuestionario = {
  id: string;
  attendee: string;
  attendee_name: string;
  is_current: boolean;
  is_active: boolean;
  is_complete: boolean;
  created_at: string;
};

export type GrupoCuestionarioConsolidado = GrupoCuestionario & {
  questionnaires: CuestionarioResult[];
};
