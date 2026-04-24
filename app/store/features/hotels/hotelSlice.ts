import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HotelsState } from "./types";
import { MasterHotel } from "@/app/components/AdminCore";
import {
  fetchHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "./hotelThunks";

const initialState: HotelsState = {
  masterHotels: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setMasterHotels: (state, action: PayloadAction<MasterHotel[]>) => {
      state.masterHotels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.masterHotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch hotels";
      })
      // Create
      .addCase(createHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.masterHotels.unshift(action.payload);
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create hotel";
      })
      // Update
      .addCase(updateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.masterHotels.findIndex((h) => h._id === action.payload._id);
        if (index !== -1) {
          state.masterHotels[index] = action.payload;
        }
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update hotel";
      })
      // Delete
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.masterHotels = state.masterHotels.filter((h) => h._id !== action.payload);
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete hotel";
      });
  },
});

export const { setMasterHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
