import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { Cuestionario, CuestionariosArgs, CuestionariosResult } from '../types';

const cuestionariosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveCuestionarios: builder.query<CuestionariosResult, CuestionariosArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/questionnaires/?is_active=${isActive}&page=${
          page + 1
        }&page_size=${pageSize}${filterParams}`;
      },
      providesTags: ['Cuestionarios'],
    }),
    retrieveCuestionario: builder.query<Cuestionario, string>({
      query: (id) => `/softskills/questionnaires/${id}/`,
      providesTags: ['Cuestionarios'],
    }),
    createCuestionario: builder.mutation<Cuestionario, Partial<Cuestionario>>({
      query: (cuestionario) => ({
        url: `/softskills/questionnaires/`,
        method: 'POST',
        body: cuestionario,
      }),
      invalidatesTags: ['Cuestionarios'],
    }),
    updateCuestionario: builder.mutation<Cuestionario, Partial<Cuestionario>>({
      query: ({ id, ...cuestionario }) => ({
        url: `/softskills/questionnaires/${id}/`,
        method: 'PUT',
        body: cuestionario,
      }),
      invalidatesTags: ['Cuestionarios'],
    }),
    patchCuestionario: builder.mutation<Cuestionario, Partial<Cuestionario>>({
      query: ({ id, ...cuestionario }) => ({
        url: `/softskills/questionnaires/${id}/`,
        method: 'PATCH',
        body: cuestionario,
      }),
      invalidatesTags: ['Cuestionarios'],
    }),
    deleteCuestionario: builder.mutation<void, string>({
      query: (id) => ({
        url: `/softskills/questionnaires/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cuestionarios'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveCuestionariosQuery,
  useRetrieveCuestionarioQuery,
  useCreateCuestionarioMutation,
  useUpdateCuestionarioMutation,
  usePatchCuestionarioMutation,
  useDeleteCuestionarioMutation,
} = cuestionariosApi;
