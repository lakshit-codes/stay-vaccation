import { createSlice } from "@reduxjs/toolkit";
import { ActivityPagesState } from "./types";
import {
  fetchActivityPages,
  createActivityPage,
  updateActivityPage,
  deleteActivityPage,
} from "./activityPageThunks";

const initialState: ActivityPagesState = {
  activityPages: [],
  loading: false,
  error: null,
};

const activityPageSlice = createSlice({
  name: "activityPages",
  initialState,
  reducers: {
    setActivityPages: (state, action) => {
      state.activityPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchActivityPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityPages.fulfilled, (state, action) => {
        state.loading = false;
        state.activityPages = action.payload;
      })
      .addCase(fetchActivityPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activity pages";
      })
      // Create
      .addCase(createActivityPage.fulfilled, (state, action) => {
        state.activityPages.unshift(action.payload);
      })
      // Update
      .addCase(updateActivityPage.fulfilled, (state, action) => {
        const index = state.activityPages.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.activityPages[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteActivityPage.fulfilled, (state, action) => {
        state.activityPages = state.activityPages.filter((p) => p._id !== action.payload);
      });
  },
});

export const { setActivityPages } = activityPageSlice.actions;
export default activityPageSlice.reducer;
