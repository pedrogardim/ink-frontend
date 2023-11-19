import { RootState } from "@/store";
import { setRedirectsTo, showAlert } from "@/store/slices/uiSlice";
import { logout } from "@/store/slices/userSlice";
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
    const errMessage = (result.error.data as any).error.message;
    api.dispatch(
      showAlert({
        type: "error",
        message: (result.error.data as any).error.message,
      })
    );
    if (errMessage === "You are not authorized to do that") {
      api.dispatch(setRedirectsTo("/"));
    }
    if (
      errMessage === "User is not authenticated" ||
      errMessage === "Session token expired"
    ) {
      api.dispatch(logout());
      api.dispatch(setRedirectsTo("/login"));
    }
  }
  return result;
};
