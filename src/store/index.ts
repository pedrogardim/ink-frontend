import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import { authApi } from "@/services/auth";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
