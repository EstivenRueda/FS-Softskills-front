import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';

export function useLoginFormResolver() {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';
    const invalid_type_error_string = 'La cadena debe contener al menos 3 carácter(es)';

    return zodResolver(
      z.object({
        email: z.string({ required_error, invalid_type_error: required_error }).min(3, invalid_type_error_string),
        password: z.string({ required_error, invalid_type_error: required_error }).min(1, invalid_type_error_string),
      })
    );
  });
}
