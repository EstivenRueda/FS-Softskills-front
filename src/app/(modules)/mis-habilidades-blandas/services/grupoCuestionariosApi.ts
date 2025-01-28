import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { GrupoCuestionario, GrupoCuestionariosArgs, GrupoCuestionariosResult } from '../types';

const grupoCuestionariosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveGruposCuestionarios: builder.query<GrupoCuestionariosResult, GrupoCuestionariosArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/questionnaire-groups/?is_active=${isActive}&page=${
          page + 1
        }&page_size=${pageSize}${filterParams}`;
      },
      providesTags: ['GrupoCuestionarios'],
    }),
    retrieveGrupoCuestionario: builder.query<GrupoCuestionario, string>({
      query: (id) => `/softskills/questionnaire-groups/${id}/`,
      providesTags: ['GrupoCuestionarios'],
    }),
    createGrupoCuestionario: builder.mutation<GrupoCuestionario, void>({
      query: () => ({
        url: `/softskills/questionnaire-groups/`,
        method: 'POST',
      }),
      invalidatesTags: ['GrupoCuestionarios', 'MiGrupoCuestionario', 'MisHabilidades'],
    }),
    updateGrupoCuestionario: builder.mutation<GrupoCuestionario, Partial<GrupoCuestionario>>({
      query: ({ id, ...cuestionario }) => ({
        url: `/softskills/questionnaire-groups/${id}/`,
        method: 'PUT',
        body: cuestionario,
      }),
      invalidatesTags: ['GrupoCuestionarios'],
    }),
    patchGrupoCuestionario: builder.mutation<GrupoCuestionario, Partial<GrupoCuestionario>>({
      query: ({ id, ...cuestionario }) => ({
        url: `/softskills/questionnaire-groups/${id}/`,
        method: 'PATCH',
        body: cuestionario,
      }),
      invalidatesTags: ['GrupoCuestionarios'],
    }),
    deleteGrupoCuestionario: builder.mutation<void, string>({
      query: (id) => ({
        url: `/softskills/questionnaire-groups/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GrupoCuestionarios'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveGruposCuestionariosQuery,
  useRetrieveGrupoCuestionarioQuery,
  useCreateGrupoCuestionarioMutation,
  useUpdateGrupoCuestionarioMutation,
  usePatchGrupoCuestionarioMutation,
  useDeleteGrupoCuestionarioMutation,
} = grupoCuestionariosApi;
