import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { Capacitacion, CapacitacionesArgs, CapacitacionesResult } from '../types';

const capacitacionesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveCapacitaciones: builder.query<CapacitacionesResult, CapacitacionesArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/softskill-trainings/?is_active=${isActive}&page=${page + 1}&page_Size=${pageSize}${filterParams}`;
      },

      providesTags: ['Capacitaciones'],
    }),
    retrieveCapacitacion: builder.query<Capacitacion, string>({
      query: (slug) => `/softskills/softskill-trainings/${slug}/`,
      providesTags: ['Capacitaciones'],
    }),
    createCapacitacion: builder.mutation<Capacitacion, Partial<Capacitacion>>({
      query: (capacitacion) => ({
        url: `/softskills/softskill-trainings/`,
        method: 'POST',
        body: capacitacion,
      }),
      invalidatesTags: ['Capacitaciones'],
    }),
    updateCapacitacion: builder.mutation<Capacitacion, Partial<Capacitacion>>({
      query: ({ id, ...capacitacion }) => ({
        url: `/softskills/softskill-trainings/${id}/`,
        method: 'PUT',
        body: capacitacion,
      }),
      invalidatesTags: ['Capacitaciones'],
    }),
    patchCapacitacion: builder.mutation<Capacitacion, Partial<Capacitacion>>({
      query: ({ id, ...capacitacion }) => ({
        url: `/softskills/softskill-trainings/${id}/`,
        method: 'PATCH',
        body: capacitacion,
      }),
      invalidatesTags: ['Capacitaciones'],
    }),
    deleteCapacitacion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/softskills/softskill-trainings/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Capacitaciones'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCapacitacionMutation,
  useRetrieveCapacitacionQuery,
  useRetrieveCapacitacionesQuery,
  useUpdateCapacitacionMutation,
  usePatchCapacitacionMutation,
  useDeleteCapacitacionMutation,
} = capacitacionesApi;

