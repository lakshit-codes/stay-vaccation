import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { AuthState } from "./types";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    return apiFetch<{ userId: string; email: string; role: string; name?: string }>("/api/auth/me");
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState() as { auth: AuthState };
      if (auth.loading || auth.authChecked) {
        return false;
      }
    },
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: any) => {
    return apiFetch<{ userId: string; email: string; role: string; name?: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: any) => {
    return apiFetch<{ userId: string; email: string; role: string; name?: string }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await apiFetch("/api/auth/logout", { method: "POST" });
  return null;
});
