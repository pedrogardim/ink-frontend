import { createApi } from "@reduxjs/toolkit/query/react";
import { authBaseQuery } from "@/utils/http";
import type { Appointment } from "@/types/appointment";
import type { PaginationResponse } from "@/types/pagination";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getMyAppointments: builder.query({
      query: () => "/appointments/my",
      transformResponse: (response: {
        data: PaginationResponse<Appointment>;
      }) => response.data,
    }),
    getMyAppointment: builder.query({
      query: (id) => `/appointments/my/${id}`,
      transformResponse: (response: { data: Appointment }) => response.data,
    }),
  }),
});

export const {
  useGetMyAppointmentQuery,
  useGetMyAppointmentsQuery,
  useLazyGetMyAppointmentQuery,
} = appointmentApi;
