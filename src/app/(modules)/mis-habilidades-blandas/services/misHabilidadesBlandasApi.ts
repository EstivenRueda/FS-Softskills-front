import { baseApi } from '@/services';
import { Pregunta } from '../../habilidades-blandas/types';
import { Cuestionario, MiHabilidadBlanda } from '../types';

const misHabilidadesBlandasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveMisHabilidadesBlandas: builder.query<MiHabilidadBlanda[], void>({
      query: () => `/softskills/my-softskill-questionnaires/`,
      providesTags: ['MisHabilidades'],
    }),
    retrieveRandomQuestions: builder.query<Pregunta[], string>({
      query: (slug) => `/softskills/${slug}/random-questions/`,
      providesTags: ['RandomQuestions'],
    }),
    retrieveMisResultados: builder.query<Cuestionario[], void>({
      query: () => `/softskills/my-results`,
      providesTags: ['MisResultados'],
    }),
  }),
  overrideExisting: false,
});

export const { useRetrieveMisHabilidadesBlandasQuery, useRetrieveRandomQuestionsQuery, useRetrieveMisResultadosQuery } =
  misHabilidadesBlandasApi;
