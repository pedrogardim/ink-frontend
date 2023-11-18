import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: User | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { token, user } = action.payload;
      state.user = user;
      state.token = token;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { authenticate, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
