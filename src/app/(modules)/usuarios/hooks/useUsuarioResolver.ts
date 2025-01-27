import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useUsuarioResolver() {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';

    return zodResolver(
      z.object({
        description: z
          .string({ required_error })
          .min(3, 'La pregunta debe tener minimo 3 caracteres')
          .max(255, 'La pregunta debe tener máximo 255 caracteres'),
        order: z
          .number({ required_error, invalid_type_error: required_error })
          .int()
          .min(1, 'El orden debe ser mayor o igual a 1'),
        options: z.array(
          z.object({
            option: z.string({ required_error }),
            grade: z
              .number({ required_error, invalid_type_error: required_error })
              .int()
              .min(1, 'El puntaje debe ser mayor o igual a 1'),
          })
        ),
      })
    );
  });
}
