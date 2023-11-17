import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertPayload {
  type: "success" | "error" | "info" | "warning";
  message: string;
}

interface AlertState extends AlertPayload {
  show: boolean;
}
export interface UiState {
  currentAlert: AlertState;
  searchValue: string;
}

const initialState: UiState = {
  currentAlert: { show: false, type: "info", message: "" },
  searchValue: "",
};

export const userSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<AlertPayload>) => {
      state.currentAlert = { ...action.payload, show: true };
    },
    hideAlert: (state) => {
      state.currentAlert.show = false;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { showAlert, hideAlert, setSearchValue } = userSlice.actions;

export default userSlice.reducer;
