import { createSlice } from "@reduxjs/toolkit";
import { DestinationsState } from "./types";
import {
  fetchDestinations,
  fetchTrending,
  createDestination,
  updateDestination,
  deleteDestination,
} from "./destinationThunks";

const initialState: DestinationsState = {
  destinations: [],
  trendingIndia: [],
  trendingInternational: [],
  loading: false,
  error: null,
};

const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = action.payload;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch destinations";
      })
      // Trending
      .addCase(fetchTrending.fulfilled, (state, action) => {
        if (action.payload.category === "India") {
          state.trendingIndia = action.payload.data;
        } else {
          state.trendingInternational = action.payload.data;
        }
      })
      // Create
      .addCase(createDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations.unshift(action.payload);
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create destination";
      })
      // Update
      .addCase(updateDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.destinations.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) {
          state.destinations[index] = action.payload;
        }
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update destination";
      })
      // Delete
      .addCase(deleteDestination.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.loading = false;
        state.destinations = state.destinations.filter((d) => d._id !== action.payload);
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete destination";
      });
  },
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
