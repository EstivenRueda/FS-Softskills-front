import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useLoggerNotifier } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import { useRetrieveHabilidadBlandaQuery, useRetrieveLikertOptionsQuery } from '../../habilidades-blandas/services';
import { useCreateCuestionarioMutation, useRetrieveRandomQuestionsQuery } from '../services';
import { Cuestionario } from '../types';
import { useCuestionarioResolver } from './useCuestionarioResolver';

export function useCuestionarioForm() {
  const { slug } = useParams<ParamsWithSlug>();
  const { notify } = useLoggerNotifier();

  const { data: habilidadBlanda, isLoading: habilidadBlandaLoading } = useRetrieveHabilidadBlandaQuery(slug);
  const { data: randomQuestions, isLoading: randomQuestionsLoading } = useRetrieveRandomQuestionsQuery(slug);
  const { data: likertOptions, isLoading: likertOptionsLoading } = useRetrieveLikertOptionsQuery();
  const [createCuestionario, { isLoading: createCuestionarioLoading }] = useCreateCuestionarioMutation();

  const capacitacionResolver = useCuestionarioResolver();
  const formContext = useForm<Cuestionario>({
    resolver: capacitacionResolver,
    mode: 'onChange',
  });

  const handleSubmit = async (data: Cuestionario) => {
    try {
      if (!habilidadBlanda) {
        notify('No se pudo obtener la habilidad blanda', 'error');
        return;
      }

      await createCuestionario({ ...data, softskill: habilidadBlanda.id }).unwrap();
      notify('Cuestionario completado correctamente', 'success');
      return;
    } catch (error) {
      notify('No se pudo completar el cuestionario', 'error', error);
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading: habilidadBlandaLoading || randomQuestionsLoading || createCuestionarioLoading || likertOptionsLoading,
    randomQuestions,
    likertOptions,
  };
}
