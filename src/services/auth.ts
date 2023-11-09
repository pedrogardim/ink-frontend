import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginBody) => ({
        url: "/auth/login",
        method: "POST",
        body: loginBody,
      }),
    }),
    register: builder.mutation({
      query: (registerBody) => ({
        url: "/auth/register",
        method: "POST",
        body: registerBody,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
