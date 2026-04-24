import { createSlice } from "@reduxjs/toolkit";
import { RegionsState } from "./types";
import {
  fetchRegions,
  createRegion,
  updateRegion,
  deleteRegion,
} from "./regionThunks";

const initialState: RegionsState = {
  regions: [],
  loading: false,
  error: null,
};

const regionSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch regions";
      })
      // Create
      .addCase(createRegion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRegion.fulfilled, (state, action) => {
        state.loading = false;
        state.regions.push(action.payload);
      })
      .addCase(createRegion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create region";
      })
      // Update
      .addCase(updateRegion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRegion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.regions.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) {
          state.regions[index] = action.payload;
        }
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update region";
      })
      // Delete
      .addCase(deleteRegion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = state.regions.filter((r) => r._id !== action.payload);
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete region";
      });
  },
});

export const { setRegions } = regionSlice.actions;
export default regionSlice.reducer;
