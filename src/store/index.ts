import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";
import {
  appointmentApi,
  authApi,
  userApi,
  adminApi,
  tattooistApi,
} from "@/services";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    //TODO: fix ts error
    user: persistReducer(persistConfig, userReducer),
    ui: uiReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [tattooistApi.reducerPath]: tattooistApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(tattooistApi.middleware)
      .concat(appointmentApi.middleware)
      .concat(adminApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
