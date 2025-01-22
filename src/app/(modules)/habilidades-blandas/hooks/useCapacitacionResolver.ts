import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useCapacitacionResolver() {
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
      })
    );
  });
}
