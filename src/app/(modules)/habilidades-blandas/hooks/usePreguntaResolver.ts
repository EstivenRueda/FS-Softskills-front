import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function usePreguntaResolver() {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';

    return zodResolver(
      z.object({
        description: z
          .string({ required_error })
          .min(3, 'La pregunta debe tener minimo 3 caracteres')
          .max(255, 'La pregunta debe tener máximo 255 caracteres'),
      })
    );
  });
}
