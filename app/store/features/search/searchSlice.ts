import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "./types";
import { fetchSuggestions } from "./searchThunks";

const initialState: SearchState = {
  results: [],
  popular: false,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.popular = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.popular = !!action.payload.popular;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Search failed";
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
