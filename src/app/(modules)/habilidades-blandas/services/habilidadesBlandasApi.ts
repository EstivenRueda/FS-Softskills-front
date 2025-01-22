import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { HabilidadBlanda, HabilidadBlandaArgs, HabilidadBlandasResult } from '../types';

const habilidadesBlandasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveHabilidadesBlandas: builder.query<HabilidadBlandasResult, HabilidadBlandaArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/softskills/?is_active=${isActive}&page=${page + 1}&page_size=${pageSize}${filterParams}`;
      },
      providesTags: ['Habilidades'],
    }),
    retrieveHabilidadBlanda: builder.query<HabilidadBlanda, string>({
      query: (slug) => `/softskills/softskills/${slug}/`,
      providesTags: ['Habilidades'],
    }),
    createHabilidadBlanda: builder.mutation<HabilidadBlanda, Partial<HabilidadBlanda>>({
      query: (habilidadBlanda) => ({
        url: `/softskills/softskills/`,
        method: 'POST',
        body: habilidadBlanda,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    updateHabilidadBlanda: builder.mutation<HabilidadBlanda, Partial<HabilidadBlanda>>({
      query: ({ slug, ...habilidadBlanda }) => ({
        url: `/softskills/softskills/${slug}/`,
        method: 'PUT',
        body: habilidadBlanda,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    patchHabilidadBlanda: builder.mutation<HabilidadBlanda, Partial<HabilidadBlanda>>({
      query: ({ slug, ...habilidadBlanda }) => ({
        url: `/softskills/softskills/${slug}/`,
        method: 'PATCH',
        body: habilidadBlanda,
      }),
      invalidatesTags: ['Habilidades'],
    }),
    deleteHabilidadBlanda: builder.mutation<void, string>({
      query: (slug) => ({
        url: `/softskills/softskills/${slug}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Habilidades'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveHabilidadesBlandasQuery,
  useRetrieveHabilidadBlandaQuery,
  useCreateHabilidadBlandaMutation,
  useUpdateHabilidadBlandaMutation,
  usePatchHabilidadBlandaMutation,
  useDeleteHabilidadBlandaMutation,
} = habilidadesBlandasApi;
