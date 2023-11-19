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
  redirectsTo: string | null;
}

const initialState: UiState = {
  currentAlert: { show: false, type: "info", message: "" },
  searchValue: "",
  redirectsTo: null,
};

export const uiSlice = createSlice({
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
    setRedirectsTo: (state, action: PayloadAction<string | null>) => {
      state.redirectsTo = action.payload;
    },
  },
});

export const { showAlert, hideAlert, setSearchValue, setRedirectsTo } =
  uiSlice.actions;

export default uiSlice.reducer;
