import { Respuesta } from './Respuesta';

export type Cuestionario = {
  id: string;
  softskill: string;
  attendee: string;
  is_current: boolean;
  observations: string;
  grade: number;
  is_active: boolean;
  answers: Respuesta[];
};

export type CuestionarioResult = Omit<Cuestionario, 'answers'> & {
  softskill_name?: string;
};
