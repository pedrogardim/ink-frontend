import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/utils/http";
import { AuthResponse } from "@/types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginBody) => ({
        url: "/auth/login",
        method: "POST",
        body: loginBody,
      }),
      transformResponse: (response: { data: AuthResponse }) => response.data,
    }),
    register: builder.mutation({
      query: (registerBody) => ({
        url: "/auth/register",
        method: "POST",
        body: registerBody,
      }),
      transformResponse: (response: { data: AuthResponse }) => response.data,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
