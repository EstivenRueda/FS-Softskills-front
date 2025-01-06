import { createApi, fetchBaseQuery, RootState } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setIsAuthenticated } from '@/store';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

// Configure the base query for API calls
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`, // API base URL from environment variables
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState<any, any, any>).auth.token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
)=>{
  await mutex.waitForUnlock();
  if (!mutex.isLocked()) {
    const release = await mutex.acquire(); // Lock the mutex to prevent concurrent refreshes
    try {
      // Attempt to refresh the authentication token
      const refreshResult = await baseQuery(
        {
          url: '/token/refresh/',
          method: 'POST',
        },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        // If the token refresh is successful, update the authentication state
        api.dispatch(setIsAuthenticated(true));
      } else {
        // If the token refresh fails, update the authentication state
        api.dispatch(setIsAuthenticated(false));
      }
    } finally {
      release(); // Release the mutex after the token refresh attempt
    }
  } else {
    // If the mutex is already locked, wait for it to be unlocked and retry the request
    await mutex.waitForUnlock();
  }
  return baseQuery(args, api, extraOptions);
}

export const baseApi = createApi({
  reducerPath:'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes:[
    'Usuarios',
    'Habilidades'
  ]
})
