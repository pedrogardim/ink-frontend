import { createApi } from "@reduxjs/toolkit/query/react";
import { authQueryWithErrorHandling } from "@/utils/http";
import type { PaginationResponse } from "@/types/pagination";
import type { User } from "@/types/user";
import type { Appointment } from "@/types/appointment";
import type { TattooWork } from "@/types/tattoowork";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: authQueryWithErrorHandling,
  endpoints: (builder) => ({
    //GET
    getUsers: builder.query({
      query: (params) => ({
        url: "/users/",
        params,
      }),
      transformResponse: (response: { data: PaginationResponse<User> }) =>
        response.data,
    }),
    getAppointments: builder.query({
      query: (params) => ({
        url: "/appointments/",
        params,
      }),
      transformResponse: (response: {
        data: PaginationResponse<Appointment>;
      }) => response.data,
    }),
    getTattooWorks: builder.query({
      query: (params) => ({
        url: "/tattooWorks/",
        params,
      }),
      transformResponse: (response: { data: PaginationResponse<TattooWork> }) =>
        response.data,
    }),
    //PUT
    editUser: builder.mutation({
      query: (body) => ({
        url: "/users/",
        method: "PUT",
        body,
      }),
      transformResponse: (response: { data: PaginationResponse<User> }) =>
        response.data,
    }),
    editAppointment: builder.mutation({
      query: (body) => ({
        url: "/appointments/",
        method: "PUT",
        body,
      }),
      transformResponse: (response: {
        data: PaginationResponse<Appointment>;
      }) => response.data,
    }),
    editTattooWork: builder.mutation({
      query: (body) => ({
        url: "/tattooWorks/",
        method: "PUT",
        body,
      }),
      transformResponse: (response: { data: PaginationResponse<TattooWork> }) =>
        response.data,
    }),
  }),
});

export const {
  useLazyGetUsersQuery,
  useLazyGetAppointmentsQuery,
  useLazyGetTattooWorksQuery,
  useEditUserMutation,
  useEditAppointmentMutation,
  useEditTattooWorkMutation,
} = adminApi;
