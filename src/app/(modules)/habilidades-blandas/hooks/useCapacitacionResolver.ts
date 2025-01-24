import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useCapacitacionResolver() {
  let minGrade: number | null = null;
  let maxGrade: number | null = null;

  return useConst(() => {
    const required_error = 'Este campo es obligatorio';

    return zodResolver(
      z.object({
        description: z
          .string({ required_error })
          .max(255, 'La pregunta debe tener máximo 255 caracteres')
          .optional()
          .nullable(),
        title: z
          .string({ required_error })
          .min(1, 'La pregunta debe tener minimo 3 caracteres')
          .max(150, 'La pregunta debe tener máximo 255 caracteres'),
        link: z
          .string({ required_error })
          .min(1, 'La pregunta debe tener minimo 3 caracteres')
          .max(255, 'La pregunta debe tener máximo 255 caracteres'),
        min_grade: z
          .number({ required_error, invalid_type_error: required_error })
          .min(1, 'El puntaje mínimo debe ser mayor a 1')
          .max(100, 'El puntaje mínimo debe ser menor a 100')
          .refine((value: number) => {
            minGrade = value;
            return maxGrade === null || value < maxGrade;
          }, 'El puntaje mínimo debe ser menor que el puntaje máximo'),
        max_grade: z
          .number({ required_error, invalid_type_error: required_error })
          .min(1, 'El puntaje máximo debe ser mayor a 1')
          .max(100, 'El puntaje mínimo debe ser menor a 100')
          .refine((value: number) => {
            maxGrade = value;
            return minGrade === null || value > minGrade;
          }, 'El puntaje máximo debe ser mayor que el puntaje mínimo'),
      })
    );
  });
}
