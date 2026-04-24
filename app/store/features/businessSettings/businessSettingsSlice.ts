import { createSlice } from "@reduxjs/toolkit";
import { BusinessSettingsState } from "./types";
import { fetchBusinessSettings } from "./businessSettingsThunks";

const initialState: BusinessSettingsState = {
  settings: null,
  loading: false,
  error: null,
};

const businessSettingsSlice = createSlice({
  name: "businessSettings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchBusinessSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch business settings";
      });
  },
});

export const { setSettings } = businessSettingsSlice.actions;
export default businessSettingsSlice.reducer;
