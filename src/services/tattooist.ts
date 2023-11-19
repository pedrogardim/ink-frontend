import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utils/http";
import { User } from "@/types/user";
import { PaginationResponse } from "@/types/pagination";

export const tattooistApi = createApi({
  reducerPath: "tattooistApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTattooists: builder.query({
      query: (params) => ({
        url: "/users/getTattooists",
        params,
      }),
      transformResponse: (response: { data: PaginationResponse<User> }) =>
        response.data.items,
    }),
    getTattooistById: builder.query({
      query: (id) => `/users/getTattooist/${id}`,
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
});

export const { useLazyGetTattooistsQuery, useLazyGetTattooistByIdQuery } =
  tattooistApi;
