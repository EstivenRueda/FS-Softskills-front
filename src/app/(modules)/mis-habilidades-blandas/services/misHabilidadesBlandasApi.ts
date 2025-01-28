import { baseApi } from '@/services';
import { Pregunta } from '../../habilidades-blandas/types';
import { CuestionarioResult, GrupoCuestionario, GrupoCuestionarioConsolidado, MiHabilidadBlanda } from '../types';

const misHabilidadesBlandasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveMiGrupoCuestionario: builder.query<GrupoCuestionario, void>({
      query: () => `/softskills/my-questionnaire-group/`,
      providesTags: ['MiGrupoCuestionario'],
    }),
    retrieveMisHabilidadesBlandas: builder.query<MiHabilidadBlanda[], void>({
      query: () => `/softskills/my-softskill-questionnaires/`,
      providesTags: ['MisHabilidades'],
    }),
    retrieveRandomQuestions: builder.query<Pregunta[], string>({
      query: (slug) => `/softskills/${slug}/random-questions/`,
      providesTags: ['RandomQuestions'],
    }),
    retrieveMisResultados: builder.query<GrupoCuestionarioConsolidado[], void>({
      query: () => `/softskills/my-results`,
      providesTags: ['MisResultados'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveMiGrupoCuestionarioQuery,
  useRetrieveMisHabilidadesBlandasQuery,
  useRetrieveRandomQuestionsQuery,
  useRetrieveMisResultadosQuery,
} = misHabilidadesBlandasApi;
