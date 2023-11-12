import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  currentAlert: {
    type: "success" | "error" | "info" | "warning";
    message: string;
  } | null;
}

const initialState: UiState = {
  currentAlert: null,
};

export const userSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    alert: (state, action) => {
      state.currentAlert = action.payload;
    },
  },
});

export const { alert } = userSlice.actions;

export default userSlice.reducer;
