import { serialize } from 'object-to-formdata';
import { baseApi } from '@/services';
import { getFilterParams } from '@/utils';
import { FileAsset, FileAssetArgs, FileAssetResult } from '../types';

const filesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     retrieveFiles: builder.query<FileAssetResult, FileAssetArgs>({
      query: ({ page, pageSize, ...params }) => {
        const filterParams = getFilterParams(params);
        return `/files/files/?page=${page + 1}&page_size=${pageSize}${filterParams}`;
      },
      providesTags: ['FileAsset'],
    }),
   retrieveFile: builder.query<FileAsset, string>({
      query: (id) => `/files/files/${id}/`,
      providesTags: ['FileAsset'],
    }),
    createFile: builder.mutation<FileAsset, Partial<FileAsset>>({
      query: (file) => ({
        url: '/files/files/',
        method: 'POST',
        body: serialize(file),
      }),
      invalidatesTags: ['FileAsset'],
    }),
    updateFile: builder.mutation<FileAsset, Partial<FileAsset>>({
      query: ({ id, ...file }) => ({
        url: `/files/files/${id}/`,
        method: 'PUT',
        body: serialize(file),
      }),
      invalidatesTags: ['FileAsset'],
    }),
    patchFile: builder.mutation<FileAsset, Partial<FileAsset>>({
      query: ({ id, ...file }) => ({
        url: `/files/files/${id}/`,
        method: 'PATCH',
        body: serialize(file),
      }),
      invalidatesTags: ['FileAsset'],
    }),
    deleteFile: builder.mutation<void, string>({
      query: (id) => ({
        url: `/files/files/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FileAsset'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRetrieveFilesQuery,
  useRetrieveFileQuery,
  useCreateFileMutation,
  useUpdateFileMutation,
  usePatchFileMutation,
  useDeleteFileMutation,
} = filesApi;
