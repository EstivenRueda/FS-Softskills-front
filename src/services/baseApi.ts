import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { setIsAuthenticated } from '@/store';

const mutex = new Mutex();

// Configure the base query for API calls
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      // Lock the mutex to prevent concurrent refreshes
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the authentication token
        const refreshResult = await baseQuery(
          {
            url: 'auth/token/refresh/',
            method: 'POST',
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          // If the token refresh is successful, update the authentication state
          api.dispatch(setIsAuthenticated(true));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If the token refresh fails, update the authentication state
          api.dispatch(setIsAuthenticated(false));
        }
      } finally {
        // Release the mutex after the token refresh attempt
        release();
      }
    } else {
      // If the mutex is already locked, wait for it to be unlocked and retry the request
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: [
    'Usuarios',
    'Habilidades',
    'Preguntas',
    'Capacitaciones',
    'FileAsset',
    'MisHabilidades',
    'RandomQuestions',
    'Cuestionarios',
  ],
});
