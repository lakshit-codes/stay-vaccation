import { createAsyncThunk } from "@reduxjs/toolkit";
import { AdminDataState } from "./types";

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchStats",
  async () => {
    // Placeholder for when a real stats API is implemented
    return {
      totalPackages: 0,
      totalBookings: 0,
      totalTransfers: 0,
      totalRevenue: 0,
    };
  },
  {
    condition: (_, { getState }) => {
      const { admin } = getState() as { admin: AdminDataState };
      if (admin.loading || admin.stats) {
        return false;
      }
    },
  }
);
