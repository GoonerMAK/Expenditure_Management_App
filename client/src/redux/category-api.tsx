import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { Category } from "../components/interfaces";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/", credentials: 'include', }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({

    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: 'categories',
        method: 'get',
      }),
      providesTags: (result) =>
        result ? 
          [...result.map(({ id }) => ({ type: 'Categories', id } as const)), { type: 'Categories', id: 'LIST' }]
          : [{ type: 'Categories', id: 'LIST' }],
    }),

    getCategoryById: builder.query<Category, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: 'get',
      }),
    }),

    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (data) => ({
        url: 'categories',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
    }),

  }),
});

export const {useGetCategoriesQuery, useGetCategoryByIdQuery, useAddCategoryMutation} = categoryApi;