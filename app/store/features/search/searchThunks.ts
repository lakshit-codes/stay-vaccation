import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { SearchDestination } from "./types";

export const fetchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async (q: string) => {
    return apiFetch<{ results: SearchDestination[]; popular: boolean }>(`/api/search?q=${encodeURIComponent(q)}`);
  }
);
