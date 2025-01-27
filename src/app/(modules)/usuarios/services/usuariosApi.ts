import { baseApi } from '@/services';
import { PlainParameter } from '@/types';
import { getFilterParams } from '@/utils';
import { Usuario, UsuariosArgs, UsuariosResult } from '../types';

const usuariosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUsuarios: builder.query<UsuariosResult, UsuariosArgs>({
      query: ({ page, pageSize, isActive = true, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/users/users/?is_active=${isActive}&page=${page + 1}&page_size=${pageSize}${filterParams}`;
      },
      providesTags: ['Usuarios'],
    }),
    retrieveUsuario: builder.query<Usuario, string>({
      query: (id) => `/users/users/${id}/`,
      providesTags: ['Usuarios'],
    }),
    createUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: (usuario) => ({
        url: `/users/users/`,
        method: 'POST',
        body: usuario,
      }),
      invalidatesTags: ['Usuarios'],
    }),
    updateUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: ({ id, ...usuario }) => ({
        url: `/users/users/${id}/`,
        method: 'PUT',
        body: usuario,
      }),
      invalidatesTags: ['Usuarios'],
    }),
    patchUsuario: builder.mutation<Usuario, Partial<Usuario>>({
      query: ({ id, ...usuario }) => ({
        url: `/users/users/${id}/`,
        method: 'PATCH',
        body: usuario,
      }),
      invalidatesTags: ['Usuarios'],
    }),
    deleteUsuario: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/users/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Usuarios'],
    }),
    retrieveProfileTypes: builder.query<PlainParameter[], void>({
      query: () => '/profiles/profile-types/',
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveUsuariosQuery,
  useRetrieveUsuarioQuery,
  useCreateUsuarioMutation,
  useUpdateUsuarioMutation,
  usePatchUsuarioMutation,
  useDeleteUsuarioMutation,
  useRetrieveProfileTypesQuery,
} = usuariosApi;
