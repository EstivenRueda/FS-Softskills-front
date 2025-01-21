import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { Pregunta, PreguntasArgs, PreguntasResult } from '../types';

const preguntasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrievePreguntas: builder.query<PreguntasResult, PreguntasArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/questions/?is_active=${isActive}&page=${page + 1}&page_Size=${pageSize}${filterParams}`;
      },
      providesTags: ['Preguntas'],
    }),
    retrievePregunta: builder.query<Pregunta, string>({
      query: (slug) => `/softskills/questions/${slug}/`,
      providesTags: ['Habilidades'],
    }),
    createPregunta: builder.mutation<Pregunta, Partial<Pregunta>>({
      query: (pregunta) => ({
        url: `/softskills/questions/`,
        method: 'POST',
        body: pregunta,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    updatePregunta: builder.mutation<Pregunta, Partial<Pregunta>>({
      query: ({ id, ...pregunta }) => ({
        url: `/softskills/questions/${id}/`,
        method: 'PUT',
        body: pregunta,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    patchPregunta: builder.mutation<Pregunta, Partial<Pregunta>>({
      query: ({ id, ...pregunta }) => ({
        url: `/softskills/questions/${id}/`,
        method: 'PATCH',
        body: pregunta,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    deletePregunta: builder.mutation<void, string>({
      query: (id) => ({
        url: `/softskills/questions/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Habilidades'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrievePreguntasQuery,
  useRetrievePreguntaQuery,
  useCreatePreguntaMutation,
  useUpdatePreguntaMutation,
  usePatchPreguntaMutation,
  useDeletePreguntaMutation,
} = preguntasApi;
