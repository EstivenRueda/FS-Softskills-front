import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useCuestionarioResolver() {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';

    return zodResolver(
      z.object({
        answers: z.array(
          z.object({
            question: z.string({ required_error }),
            option: z.string({ required_error }),
          })
        ),
      })
    );
  });
}
