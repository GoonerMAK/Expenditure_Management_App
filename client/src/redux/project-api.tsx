import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project } from "../components/interfaces";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/", credentials: 'include', }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({

    getProjects: builder.query<Project[], void>({
      query: () => ({
        url: 'projects',
        method: 'get',
      }),
      providesTags: (result) =>
        result ?
          [...result.map(({ id }) => ({ type: 'Project', id: id } as const)), { type: 'Project', id: 'LIST' }]
          : [{ type: 'Project', id: 'LIST' }],
    }),

    getProjectById: builder.query<Project, string>({
      query: (id) => ({
        url: `projects/${id}`,
        method: 'get',
      }),
    }),

    addProject: builder.mutation<Project, Partial<Project>>({
      query: (data) => ({
        url: 'projects',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }],
    }),

    updateProject: builder.mutation<Project, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),

  }),
});

export const {useAddProjectMutation, useGetProjectByIdQuery, useGetProjectsQuery, useUpdateProjectMutation} = projectApi;

