import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useIsViewPage, useLoggerNotifier } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import {
  useCreateCapacitacionMutation,
  useUpdateCapacitacionMutation,
  useRetrieveHabilidadBlandaQuery,
} from '../services';
import { Capacitacion } from '../types';
import { useCapacitacionResolver } from './useCapacitacionResolver';

export type UseCapacitacionFormOptions = {
  capacitacion?: Capacitacion;
  onCompleted?: () => void;
};

export function useCapacitacionForm(options: UseCapacitacionFormOptions) {
  const { slug } = useParams<ParamsWithSlug>();
  const { capacitacion, onCompleted } = options;
  const { notify } = useLoggerNotifier();
  const isViewPage = useIsViewPage();

  const { data: habilidadBlanda, isLoading: habilidadBlandaLoading } = useRetrieveHabilidadBlandaQuery(slug);
  const [createCapacitacion, { isLoading: createCapacitacionLoading }] = useCreateCapacitacionMutation();
  const [updateCapacitacion, { isLoading: updateCapacitacionLoading }] = useUpdateCapacitacionMutation();

  const capacitacionResolver = useCapacitacionResolver();
  const formContext = useForm<Capacitacion>({
    resolver: capacitacionResolver,
    values: capacitacion,
    mode: 'onChange',
  });

  const handleSubmit = async (data: Capacitacion) => {
    try {
      if (!habilidadBlanda) {
        notify('No se pudo obtener la habilidad blanda', 'error');
        return;
      }

      if (capacitacion) {
        await updateCapacitacion({
          ...capacitacion,
          ...data,
        }).unwrap();
        notify('Capacitación actualizada correctamente', 'success');
        onCompleted?.();
        return;
      }
      await createCapacitacion({ ...data, softskill: habilidadBlanda.id }).unwrap();
      notify('Capacitación creada correctamente', 'success');
      onCompleted?.();
      return;
    } catch (error) {
      if (habilidadBlanda) {
        notify('No se pudo actualizar la capacitación', 'error', error);
        return;
      }
      notify('No se pudo crear la capacitación', 'error', error);
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading: habilidadBlandaLoading || createCapacitacionLoading || updateCapacitacionLoading,
    isViewPage,
  };
}
