import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";
import type { User } from "@/types/user";
import type { PaginationResponse } from "@/types/pagination";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/users/",
        params,
      }),
      transformResponse: (response: { data: PaginationResponse<User> }) =>
        response.data,
    }),
  }),
});

export const { useLazyGetUsersQuery } = adminApi;
