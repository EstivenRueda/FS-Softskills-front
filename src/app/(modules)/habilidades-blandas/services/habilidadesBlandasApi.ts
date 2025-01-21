import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { HabilidadBlanda, HabilidadBlandaArgs, HabilidadBlandasResult } from '../types';
import { method } from 'lodash';

const habilidadesBlandasApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveHabilidadesBlandas: builder.query<HabilidadBlandasResult, HabilidadBlandaArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/softskills/softskills/?is_active=${isActive}&page=${page + 1}&page_Size=${pageSize}${filterParams}`;
      },
      providesTags: ['Habilidades'],
    }),
    patchHabilidadBlanda: builder.mutation<HabilidadBlanda, Partial<HabilidadBlanda>>({
      query: ({id, ...habilidadBlanda}) => ({
        url:`/softskills/softskills/${id}/`,
        method:'PATCH',
        body:habilidadBlanda
      }),
      invalidatesTags: ['Habilidades']
    })
  }),
  overrideExisting: false,
});

export const { useRetrieveHabilidadesBlandasQuery, usePatchHabilidadBlandaMutation } = habilidadesBlandasApi;
