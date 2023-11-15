import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";
import { User } from "@/types/user";
import { PaginationResponse } from "@/types/pagination";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    updateMyProfile: builder.mutation({
      query: (updateBody) => ({
        url: "/users/me",
        method: "PUT",
        body: updateBody,
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
    getTattooists: builder.query({
      query: (params) => ({
        url: "/users/getTattooists",
        params,
      }),
      transformResponse: (response: { data: PaginationResponse<User> }) =>
        response.data.items,
    }),
  }),
});

export const { useUpdateMyProfileMutation, useLazyGetTattooistsQuery } =
  userApi;
