import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});
export const authBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      headers.set("Authorization", `Bearer ${jwtToken}`);
    }
    return headers;
  },
});
