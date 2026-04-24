import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivitiesState } from "./types";
import { MasterActivity } from "@/app/components/AdminCore";
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "./activityThunks";

const initialState: ActivitiesState = {
  masterActivities: [],
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setMasterActivities: (state, action: PayloadAction<MasterActivity[]>) => {
      state.masterActivities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.masterActivities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch activities";
      })
      // Create
      .addCase(createActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.masterActivities.unshift(action.payload);
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create activity";
      })
      // Update
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.masterActivities.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.masterActivities[index] = action.payload;
        }
      })
      .addCase(updateActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update activity";
      })
      // Delete
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.masterActivities = state.masterActivities.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete activity";
      });
  },
});

export const { setMasterActivities } = activitySlice.actions;
export default activitySlice.reducer;
