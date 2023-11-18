import { RootState } from "@/store";
import { showAlert } from "@/store/slices/uiSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const authBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState }) => {
    const jwtToken = (getState() as RootState).user.token;
    if (jwtToken) headers.set("Authorization", `Bearer ${jwtToken}`);
    return headers;
  },
});

export const authQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await authBaseQuery(args, api, extraOptions);
  if (result.error) {
    api.dispatch(
      showAlert({
        type: "error",
        message: (result.error.data as any).error.message,
      })
    );
    throw result.error;
  }
  return result;
};
