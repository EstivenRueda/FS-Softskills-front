import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useLoggerNotifier } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import { useRetrieveHabilidadBlandaQuery, useRetrieveLikertOptionsQuery } from '../../habilidades-blandas/services';
import {
  useCreateCuestionarioMutation,
  useRetrieveMiGrupoCuestionarioQuery,
  useRetrieveMisHabilidadesBlandasQuery,
  useRetrieveRandomQuestionsQuery,
} from '../services';
import { Cuestionario } from '../types';
import { useCuestionarioResolver } from './useCuestionarioResolver';

export function useCuestionarioForm() {
  const { slug } = useParams<ParamsWithSlug>();
  const router = useRouter();
  const { notify } = useLoggerNotifier();

  const { data: habilidadBlanda, isLoading: habilidadBlandaLoading } = useRetrieveHabilidadBlandaQuery(slug);
  const { data: miGrupoCuestionario, isLoading: miGrupoCuestionarioLoading } = useRetrieveMiGrupoCuestionarioQuery();
  const { data: misHabilidadesBlandas, isLoading: misHabilidadesBlandasLoading } =
    useRetrieveMisHabilidadesBlandasQuery();
  const { data: randomQuestions, isLoading: randomQuestionsLoading } = useRetrieveRandomQuestionsQuery(slug);
  const { data: likertOptions, isLoading: likertOptionsLoading } = useRetrieveLikertOptionsQuery();
  const [createCuestionario, { isLoading: createCuestionarioLoading }] = useCreateCuestionarioMutation();

  const idxHabilidad = misHabilidadesBlandas?.findIndex((habilidad) => habilidad.id === habilidadBlanda?.id) ?? -1;
  const hasFinished = misHabilidadesBlandas && idxHabilidad === misHabilidadesBlandas.length - 1;

  const capacitacionResolver = useCuestionarioResolver();
  const formContext = useForm<Cuestionario>({
    resolver: capacitacionResolver,
    mode: 'onChange',
  });
  const { reset } = formContext;

  useEffect(() => {
    if (randomQuestions && !!randomQuestions.length) {
      reset({
        ...formContext.getValues(),
        answers: randomQuestions.map((question) => ({ question: question.id, option: undefined })),
      });
    }
  }, [randomQuestions, reset]);

  const handleSubmit = async (data: Cuestionario) => {
    try {
      if (!habilidadBlanda) {
        notify('No se pudo obtener la habilidad blanda', 'error');
        return;
      }

      if (!miGrupoCuestionario) {
        notify('No se pudo obtener el grupo de cuestionario', 'error');
        return;
      }

      await createCuestionario({
        ...data,
        questionnaire_group: miGrupoCuestionario.id,
        softskill: habilidadBlanda.id,
      }).unwrap();
      notify('Cuestionario guardado correctamente', 'success');

      if (misHabilidadesBlandas && idxHabilidad < misHabilidadesBlandas.length - 1) {
        router.push(`/mis-habilidades-blandas/${misHabilidadesBlandas[idxHabilidad + 1].slug}/cuestionario`);
      } else if (hasFinished) {
        router.push(`/mis-habilidades-blandas/`);
      }
      return;
    } catch (error) {
      notify('No se pudo guardar el cuestionario', 'error', error);
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading:
      habilidadBlandaLoading ||
      miGrupoCuestionarioLoading ||
      misHabilidadesBlandasLoading ||
      randomQuestionsLoading ||
      createCuestionarioLoading ||
      likertOptionsLoading,
    randomQuestions,
    likertOptions,
    hasFinished,
  };
}
