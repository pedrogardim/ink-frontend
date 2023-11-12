import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertState {
  type: "success" | "error" | "info" | "warning";
  message: string;
  show: boolean;
}
export interface UiState {
  currentAlert: AlertState;
}

const initialState: UiState = {
  currentAlert: { show: false, type: "info", message: "" },
};

export const userSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertState>) => {
      state.currentAlert = { ...action.payload, show: true };
    },
    hideAlert: (state) => {
      state.currentAlert.show = false;
    },
  },
});

export const { showAlert, hideAlert } = userSlice.actions;

export default userSlice.reducer;
