import type { User } from '@/types';
import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => '/auth/user/',
      providesTags: ['Usuarios'],
    }),
    patchUser: builder.mutation<User, Partial<User>>({
      query: ({ ...user }) => ({
        url: `/auth/user/`,
        method: 'PATCH',
        body: user,
      }),
      invalidatesTags: ['Usuarios'],
    }),
    register: builder.mutation({
      query: ({ username, email, password1, password2 }) => ({
        url: '/auth/registration/',
        method: 'POST',
        body: { username, email, password1, password2 },
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/login/',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Usuarios'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/auth/token/verify/',
        method: 'POST',
      }),
      invalidatesTags: ['Usuarios'],
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/token/refresh/',
        method: 'POST',
      }),
    }),
    SendEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/password/reset/',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Usuarios'],
    }),
    ResetConfirm: builder.mutation({
      query: ({ new_password, uidb64, token }) => ({
        url: '/auth/password/reset/confirm/',
        method: 'POST',
        body: { new_password, uidb64, token },
      }),
      invalidatesTags: ['Usuarios'],
    }),
    PasswordUpdate: builder.mutation({
      query: ({ email, current_password, new_password }) => ({
        url: '/auth/password/change/',
        method: 'POST',
        body: { email, current_password, new_password },
      }),
      invalidatesTags: ['Usuarios'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveUserQuery,
  usePatchUserMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useVerifyMutation,
  useRefreshMutation,
  useSendEmailMutation,
  useResetConfirmMutation,
  usePasswordUpdateMutation,
} = authApi;
