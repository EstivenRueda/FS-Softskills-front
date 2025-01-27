import { useForm } from 'react-hook-form';
import { useLoggerNotifier } from '@/hooks';
import { useCreateUsuarioMutation, useRetrieveProfileTypesQuery, useUpdateUsuarioMutation } from '../services';
import { Usuario } from '../types';
import { useUsuarioResolver } from './useUsuarioResolver';

export type UseUsuarioFormOptions = {
  usuario?: Usuario;
  onCompleted?: () => void;
};

export function useUsuarioForm(options: UseUsuarioFormOptions) {
  const { usuario, onCompleted } = options;
  const { notify } = useLoggerNotifier();

  const [createUsuario, { isLoading: createUsuarioLoading }] = useCreateUsuarioMutation();
  const [updateUsuario, { isLoading: updateUsuarioLoading }] = useUpdateUsuarioMutation();
  const { data: profileTypes, isLoading: profileTypesLoading } = useRetrieveProfileTypesQuery();

  const usuarioResolver = useUsuarioResolver(usuario);
  const formContext = useForm<Usuario>({
    resolver: usuarioResolver,
    values: usuario,
    mode: 'onChange',
  });

  const handleSubmit = async (data: Usuario) => {
    try {
      if (usuario) {
        await updateUsuario({
          ...usuario,
          ...data,
        }).unwrap();
        notify('Usuario actualizado correctamente', 'success');
        onCompleted?.();
        return;
      }
      await createUsuario(data).unwrap();
      notify('Usuario creado correctamente', 'success');
      onCompleted?.();
      return;
    } catch (error) {
      if (usuario) {
        notify('No se pudo actualizar el usuario', 'error', error);
        return;
      }
      notify('No se pudo crear el usuario', 'error', error);
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading: createUsuarioLoading || updateUsuarioLoading || profileTypesLoading,
    profileTypes,
  };
}
