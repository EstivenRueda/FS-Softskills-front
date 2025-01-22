export type Opcion = {
  id?: string;
  question?: string;
  option: string;
  grade: number;
  display_name?: string;
};

export type Pregunta = {
  id: string;
  softskill: string;
  softskill_name?: string;
  description: string;
  order: number;
  is_active: boolean;
  options: Opcion[];
};
