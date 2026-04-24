import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PackagesState } from "./types";
import { Package } from "@/app/components/AdminCore";
import {
  fetchPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "./packageThunks";

const initialState: PackagesState = {
  packages: [],
  loading: false,
  error: null,
};

const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setPackages: (state, action: PayloadAction<Package[]>) => {
      state.packages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch packages";
      })
      // Create
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages.unshift(action.payload);
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create package";
      })
      // Update
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.packages.findIndex((p) => (p.id || (p as any)._id) === (action.payload.id || (action.payload as any)._id));
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update package";
      })
      // Delete
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = state.packages.filter((p) => (p.id || (p as any)._id) !== action.payload);
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete package";
      });
  },
});

export const { setPackages } = packageSlice.actions;
export default packageSlice.reducer;
