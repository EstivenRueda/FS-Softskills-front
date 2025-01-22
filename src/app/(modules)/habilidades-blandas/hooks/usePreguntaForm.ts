import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useIsViewPage, useLoggerNotifier } from '@/hooks';
import { ParamsWithSlug } from '@/types';
import {
  useCreatePreguntaMutation,
  useRetrieveHabilidadBlandaQuery,
  useRetrieveLikertOptionsQuery,
  useUpdatePreguntaMutation,
} from '../services';
import { Pregunta } from '../types';
import { usePreguntaResolver } from './usePreguntaResolver';

export type UsePreguntaFormOptions = {
  pregunta?: Pregunta;
  onCompleted?: () => void;
};

export function usePreguntaForm(options: UsePreguntaFormOptions) {
  const { slug } = useParams<ParamsWithSlug>();
  const { pregunta, onCompleted } = options;
  const { notify } = useLoggerNotifier();
  const isViewPage = useIsViewPage();

  const { data: habilidadBlanda, isLoading: habilidadBlandaLoading } = useRetrieveHabilidadBlandaQuery(slug);
  const { data: likertOptions, isLoading: likertOptionsLoading } = useRetrieveLikertOptionsQuery();
  const [createPregunta, { isLoading: createPreguntaLoading }] = useCreatePreguntaMutation();
  const [updatePregunta, { isLoading: updatePreguntaLoading }] = useUpdatePreguntaMutation();

  const preguntaResolver = usePreguntaResolver();
  const formContext = useForm<Pregunta>({
    resolver: preguntaResolver,
    values: pregunta,
    defaultValues: {
      options: pregunta?.options || [],
    },
    mode: 'onChange',
  });

  const { control, reset } = formContext;
  const { fields, append, remove } = useFieldArray({ control, name: 'options' });

  useEffect(() => {
    if (!!!pregunta && likertOptions && !!likertOptions.length) {
      reset({
        ...formContext.getValues(),
        options: likertOptions.map(option => ({ option: option.value, grade: 0 })),
      });
    }
  }, [likertOptions, reset]);

  const handleSubmit = async (data: Pregunta) => {
    try {
      if (!habilidadBlanda) {
        notify('No se pudo obtener la habilidad blanda', 'error');
        return;
      }

      if (pregunta) {
        await updatePregunta({ ...pregunta, ...data, softskill: habilidadBlanda.id, options: [...pregunta.options, ...data.options] }).unwrap();
        notify('Pregunta actualizada correctamente', 'success');
        onCompleted?.();
        return;
      }
      await createPregunta({ ...data, softskill: habilidadBlanda.id }).unwrap();
      notify('Pregunta creada correctamente', 'success');
      onCompleted?.();
      return;
    } catch (error) {
      if (habilidadBlanda) {
        notify('No se pudo actualizar la pregunta', 'error', error);
        return;
      }
      notify('No se pudo crear la pregunta', 'error', error);
    }
  };

  return {
    formContext,
    handleSubmit,
    isLoading: habilidadBlandaLoading || createPreguntaLoading || updatePreguntaLoading || likertOptionsLoading,
    isViewPage,
    likertOptions,
    fields,
  };
}
