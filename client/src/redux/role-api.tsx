import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Role, RoleWithUsers } from "../components/interfaces";

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/", credentials: 'include', }),
  tagTypes: ["Role", "RoleWithUsers"],
  endpoints: (builder) => ({

    getRoles: builder.query<Role[], void>({
      query: () => ({
        url: 'roles',
        method: 'get',
      }),
      providesTags: (result) =>
        result 
          ? [...result.map(({ id }) => ({ type: 'Role', id: id } as const)), { type: 'Role', id: 'LIST' }]
          : [{ type: 'Role', id: 'LIST' }],
    }),

    getRoleById: builder.query<Role, string>({
        query: (id) => ({
            url: `roles/${id}`,
            method: 'get',
        }),
    }),

    addRole: builder.mutation<Role, Partial<Role>>({
        query: (data) => ({
            url: 'roles',
            method: 'post',
            body: data,
        }),
        invalidatesTags: [{ type: 'Role', id: 'LIST' }],
    }),
  
    updateRole: builder.mutation<Role, { id: string; data: Partial<Role> }>({
      query: ({ id, data }) => ({
        url: `roles/${id}`,
        method: 'put',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Role', id }],
    }),

    getUsersByRoles: builder.query<RoleWithUsers[], void>({
        query: () => ({
          url: 'roles/users/by-role',
          method: 'get',
          transformResponse: (response: [string, ...string[]][]) => {
            return response.map(([role_name, ...users]) => ({ role_name, users }));
          },
        }),
        providesTags: (result) =>
          result
            ? [...result.map(({ role_name }) => ({ type: 'RoleWithUsers', id: role_name } as const)), { type: 'RoleWithUsers', id: 'LIST' }]
            : [{ type: 'RoleWithUsers', id: 'LIST' }],
    }),

    getUnassignedRolesByUserId: builder.query<Role[], string>({
        query: (id) => ({
            url: `roles/unassigned/${id}`,
            method: 'get',
          }),
          providesTags: (result) =>
            result 
              ? [...result.map(({ id }) => ({ type: 'Role', id: id } as const)), { type: 'Role', id: 'LIST' }]
              : [{ type: 'Role', id: 'LIST' }],
    }),

    getAssignedRolesByUserId: builder.query<Role[], string>({
        query: (id) => ({
            url: `roles/assigned/${id}`,
            method: 'get',
          }),
          providesTags: (result) =>
            result 
                ? [{ type: 'Role', id: result.id }, { type: 'Role', id: 'LIST' }]
                : [{ type: 'Role', id: 'LIST' }],
    }),

  }),
});

export const {useGetRolesQuery, useGetRoleByIdQuery, useAddRoleMutation, useUpdateRoleMutation, useGetUsersByRolesQuery, useGetAssignedRolesByUserIdQuery, useGetUnassignedRolesByUserIdQuery} = roleApi;