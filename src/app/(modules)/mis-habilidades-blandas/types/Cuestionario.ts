import { Respuesta } from './Respuesta';

export type Cuestionario = {
  id: string;
  softskill: string;
  softskill_name: string;
  attendee: string;
  attendee_name: string;
  is_current: boolean;
  observations: string;
  grade: number;
  is_active: boolean;
  answers: Respuesta[];
};

export type CuestionarioResult = Omit<Cuestionario, 'answers'>
