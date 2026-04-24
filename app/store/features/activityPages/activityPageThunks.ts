import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { ActivityPagesState } from "./types";
import { ActivityPage } from "@/app/components/AdminCore";

export const fetchActivityPages = createAsyncThunk(
  "activityPages/fetchActivityPages",
  async () => {
    return apiFetch<ActivityPage[]>("/api/activity-pages");
  },
  {
    condition: (_, { getState }) => {
      const { activityPages } = getState() as { activityPages: ActivityPagesState };
      if (activityPages.loading || activityPages.activityPages.length > 0) {
        return false;
      }
    },
  }
);

export const createActivityPage = createAsyncThunk("activityPages/createActivityPage", async (page: Partial<ActivityPage>) => {
  return apiFetch<ActivityPage>("/api/activity-pages", {
    method: "POST",
    body: JSON.stringify(page),
  });
});

export const updateActivityPage = createAsyncThunk("activityPages/updateActivityPage", async (page: ActivityPage) => {
  return apiFetch<ActivityPage>(`/api/activity-pages/${page._id}`, {
    method: "PUT",
    body: JSON.stringify(page),
  });
});

export const deleteActivityPage = createAsyncThunk("activityPages/deleteActivityPage", async (id: string) => {
  await apiFetch(`/api/activity-pages/${id}`, {
    method: "DELETE",
  });
  return id;
});
