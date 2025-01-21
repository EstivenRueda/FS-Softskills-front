import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getRowGroupingCriteriaFromGroupingField } from '@mui/x-data-grid/internals';
import { useLoggerNotifier } from '@/hooks';
import { scrollToTop } from '@/utils';
import {
  useCreateHabilidadBlandaMutation,
  useRetrieveHabilidadBlandaQuery,
  useUpdateHabilidadBlandaMutation,
} from '../services';
import { HabilidadBlanda } from '../types';
import { useHabilidadBlandaResolver } from './useHabilidadBlandaResolver';

export function useHabilidadBlandaInfoForm(slug: string) {
  const router = useRouter();
  const { notify } = useLoggerNotifier();
  const { data: habilidadBlanda } = useRetrieveHabilidadBlandaQuery(slug, { skip: !slug });
  const [createHabilidadBlanda, { isLoading: createHabilidadBlandaLoading }] = useCreateHabilidadBlandaMutation();
  const [updateHabilidadBlanda, { isLoading: updateHabilidadBlandaLoading }] = useUpdateHabilidadBlandaMutation();

  const habilidadBlandaResolver = useHabilidadBlandaResolver();
  const formContext = useForm<HabilidadBlanda>({
    resolver: habilidadBlandaResolver,
    mode: 'onChange',
  });

  const handleSubmit = async (data: HabilidadBlanda) => {
    try {
      if (habilidadBlanda) {
        await updateHabilidadBlanda({ ...habilidadBlanda, ...data }).unwrap();
        notify('Habilidad blanda actualizada correctamente', 'success');
        scrollToTop();
        return;
      }
      const habilidadBlandaCreated = await createHabilidadBlanda(data).unwrap();
      notify('Habilidad blanda creada correctamente', 'success');
      router.push(`/habilidades-blandas${habilidadBlandaCreated.slug}/editar`);
      scrollToTop();
      return;
    } catch (error) {
      if (habilidadBlanda) {
        notify('No se pudo actualizar la habilidad blanda', 'error', error);
        return;
      }
      notify('No se pudo crear la habilidad blanda', 'error', error);
    }
  };

  return { formContext, isLoading: createHabilidadBlandaLoading || updateHabilidadBlandaLoading, handleSubmit };
}
