import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useHabilidadBlandaResolver() {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';

    return zodResolver(
      z.object({
        name: z
          .string({ required_error })
          .min(3, 'El nombre debe tener minimo 3 caracteres')
          .max(60, 'El nombre debe tener máximo 60 caracteres'),
      })
    );
  });
}
