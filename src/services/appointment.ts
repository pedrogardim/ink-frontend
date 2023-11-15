import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";
import type { Appointment } from "@/types/appointment";
import type { PaginationResponse } from "@/types/pagination";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getMyAppointments: builder.query({
      query: (params) => ({ url: "/appointments/my", params }),
      transformResponse: (response: {
        data: PaginationResponse<Appointment>;
      }) => response.data,
    }),
    getMyAppointment: builder.query({
      query: (id) => `/appointments/my/${id}`,
      transformResponse: (response: { data: Appointment }) => response.data,
    }),
    updateMyAppointment: builder.mutation({
      query: ({ id, body }) => ({
        url: `/appointments/my/${id}`,
        method: "PUT",
        body,
      }),
      transformResponse: (response: { data: Appointment }) => response.data,
    }),
    createMyAppointment: builder.mutation({
      query: ({ body }) => ({
        url: `/appointments/my`,
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Appointment }) => response.data,
    }),
  }),
});

export const {
  useGetMyAppointmentQuery,
  useGetMyAppointmentsQuery,
  useLazyGetMyAppointmentQuery,
  useLazyGetMyAppointmentsQuery,
  useUpdateMyAppointmentMutation,
  useCreateMyAppointmentMutation
} = appointmentApi;
