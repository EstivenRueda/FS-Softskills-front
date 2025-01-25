import { baseApi } from '@/services';
import { Pregunta } from '../../habilidades-blandas/types';
import { MiHabilidadBlanda } from '../types';

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
  }),
  overrideExisting: false,
});

export const { useRetrieveMisHabilidadesBlandasQuery, useRetrieveRandomQuestionsQuery } = misHabilidadesBlandasApi;
