import { createApi } from "@reduxjs/toolkit/query/react";
import { authQueryWithErrorHandling } from "@/utils/http";
import { User } from "@/types/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: authQueryWithErrorHandling,
  endpoints: (builder) => ({
    updateMyProfile: builder.mutation({
      query: (updateBody) => ({
        url: "/users/me",
        method: "PUT",
        body: updateBody,
      }),
      transformResponse: (response: { data: User }) => response.data,
    }),
  }),
});

export const { useUpdateMyProfileMutation } = userApi;
