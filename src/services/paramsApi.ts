import { baseApi } from './baseApi';

export type PlainParameter = {
  display_name: string;
  value: string;
};

export type QuestionsGroupsParameter = {
  results: Parameter[];
};

export type Parameter = {
  id: string;
  name: string;
  abbr: string;
  order: string;
  description: string;
  is_active: boolean;
  [key: string]: string | number | boolean;
};

export type ParameterResults = {
  count: number;
  next: string;
  previous: string;
  results: Parameter[];
};

const paramsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({


    retrieveFileCategories: builder.query<Parameter[], void>({
      query: () => '/files/categories/?get_all=true',
    }),

  }),
  overrideExisting: false,
});

export const {
  useRetrieveFileCategoriesQuery,
} = paramsApi;
