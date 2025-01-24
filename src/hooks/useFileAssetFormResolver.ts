import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useFileAssetFormResolver() {

  return useConst(() => {
    const required_error = "Este campo es obligatorio";

    return zodResolver(
      z.object({
        reference_link: z
          .string()
          .max(200,'Máximo de caracteres 200')
          .optional()
          .nullable(),
        observations: z
          .string()
          .max(255,'Máximo de caracteres 255' )
          .optional()
          .nullable(),
        path: z.any(),
      })
    );
  });
}
