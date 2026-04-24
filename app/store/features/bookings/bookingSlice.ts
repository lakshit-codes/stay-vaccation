import { createSlice } from "@reduxjs/toolkit";
import { BookingsState } from "./types";
import { fetchBookings, updateBooking, deleteBooking } from "./bookingThunks";

const initialState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch bookings";
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
