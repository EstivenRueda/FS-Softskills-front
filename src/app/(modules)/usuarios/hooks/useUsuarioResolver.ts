import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useConst } from '@/hooks';
import { Usuario } from '../types';

export function useUsuarioResolver(usuario?: Usuario) {
  return useConst(() => {
    const required_error = 'Este campo es obligatorio';
    let password: string | null = null;
    let passwordConfirm: string | null = null;

    const schema = z.object({
      first_name: z
        .string({ required_error })
        .min(3, 'Los nombres deben tener minimo 3 caracteres')
        .max(150, 'Los nombres deben tener máximo 150 caracteres'),
      last_name: z
        .string({ required_error })
        .min(3, 'Los apellidos deben tener minimo 3 caracteres')
        .max(150, 'Los apellidos deben tener máximo 150 caracteres'),
      email: z.string({ required_error }).email(),
      username: z.string({ required_error }).max(150, 'El nombre de usuario debe tener máximo 150 caracteres'),
      profile: z.object({
        type: z.string({ required_error }),
      }),
      ...(usuario
        ? {}
        : {
            password: z
              .string({ required_error })
              .min(6, 'La contraseña debe tener minimo 6 caracteres')
              .refine((data) => {
                password = data;
                return password === null || password === passwordConfirm;
              }, 'Las contraseñas no coinciden'),
            password_confirm: z
              .string({ required_error })
              .min(6, 'La confirmación de la contraseña debe tener minimo 6 caracteres')
              .refine((data) => {
                passwordConfirm = data;
                return password === null || password === passwordConfirm;
              }, 'Las contraseñas no coinciden'),
          }),
    });
    return zodResolver(schema);
  });
}
