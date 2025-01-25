import { Opcion, Pregunta } from '../../habilidades-blandas/types';

export type Respuesta = {
  id: string;
  questionnaire: string;
  question: string;
  question_obj?: Pregunta;
  option: string;
  option_obj?: Opcion;
  grade: number;
};
