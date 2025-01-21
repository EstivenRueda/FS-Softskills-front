export type Opcion = {
  id:string;
  question: string;
  option: string;
  grade: number;
}

export type Pregunta = {
  id:string;
  softskill: string;
  softskill_name?: string;
  description: string;
  order: number;
  is_active: boolean;
  options: Opcion[];

}
