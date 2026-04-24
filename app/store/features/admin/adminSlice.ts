import { createSlice } from "@reduxjs/toolkit";
import { AdminDataState } from "./types";
import { fetchAdminStats } from "./adminThunks";

const initialState: AdminDataState = {
  stats: null,
  recentBookings: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setRecentBookings: (state, action) => {
      state.recentBookings = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch admin stats";
      });
  },
});

export const { setStats, setRecentBookings } = adminSlice.actions;
export default adminSlice.reducer;
