import { useForm } from 'react-hook-form';
import { useLoggerNotifier } from '@/hooks';
import { useUpdateCuestionarioMutation } from '../../mis-habilidades-blandas/services';
import { CuestionarioResult } from '../../mis-habilidades-blandas/types';

// import { usePreguntaResolver } from './usePreguntaResolver';

export type UseCuestionarioResultFormOptions = {
  cuestionario: CuestionarioResult;
  onCompleted?: () => void;
};

export function useCuestionarioResultForm(options: UseCuestionarioResultFormOptions) {
  const { cuestionario, onCompleted } = options;
  const { notify } = useLoggerNotifier();

  const [updateCuestionario, { isLoading: updateCuestionarioLoading }] = useUpdateCuestionarioMutation();

  // const preguntaResolver = usePreguntaResolver();
  const formContext = useForm<CuestionarioResult>({
    // resolver: preguntaResolver,
    values: cuestionario,
    mode: 'onChange',
  });

  const handleSubmit = async (data: CuestionarioResult) => {
    try {
      await updateCuestionario({
        ...cuestionario,
        ...data,
      }).unwrap();
      notify('Cuestionario actualizado correctamente', 'success');
      onCompleted?.();
      return;
    } catch (error) {
      notify('No se pudo actualizar el cuestionario', 'error', error);
      return;
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading: updateCuestionarioLoading,
  };
}
