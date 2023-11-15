import { User } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("jwtToken");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
