import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertState {
  type: "success" | "error" | "info" | "warning";
  message: string;
}
export interface UiState {
  currentAlert: AlertState | null;
}

const initialState: UiState = {
  currentAlert: null,
};

export const userSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.currentAlert = action.payload;
    },
    hideAlert: (state) => {
      state.currentAlert = null;
    },
  },
});

export const { showAlert, hideAlert } = userSlice.actions;

export default userSlice.reducer;
