import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { BusinessSettingsState } from "./types";

export const fetchBusinessSettings = createAsyncThunk(
  "businessSettings/fetchBusinessSettings",
  async () => {
    return apiFetch<any>("/api/business-settings");
  },
  {
    condition: (_, { getState }) => {
      const { businessSettings } = getState() as { businessSettings: BusinessSettingsState };
      if (businessSettings.loading || businessSettings.settings) {
        return false;
      }
    },
  }
);
