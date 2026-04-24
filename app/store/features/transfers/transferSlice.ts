import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransfersState } from "./types";
import { TransferRecord } from "@/app/components/AdminCore";
import {
  fetchTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
} from "./transferThunks";

const initialState: TransfersState = {
  transfers: [],
  loading: false,
  error: null,
};

const transferSlice = createSlice({
  name: "transfers",
  initialState,
  reducers: {
    setTransfers: (state, action: PayloadAction<TransferRecord[]>) => {
      state.transfers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTransfers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers = action.payload;
      })
      .addCase(fetchTransfers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transfers";
      })
      // Create
      .addCase(createTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers.push(action.payload);
      })
      .addCase(createTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create transfer";
      })
      // Update
      .addCase(updateTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTransfer.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.transfers.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.transfers[index] = action.payload;
        }
      })
      .addCase(updateTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update transfer";
      })
      // Delete
      .addCase(deleteTransfer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransfer.fulfilled, (state, action) => {
        state.loading = false;
        state.transfers = state.transfers.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTransfer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete transfer";
      });
  },
});

export const { setTransfers } = transferSlice.actions;
export default transferSlice.reducer;
