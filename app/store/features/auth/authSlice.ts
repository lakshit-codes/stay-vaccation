import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { checkAuth, login, signup, logout } from "./authThunks";

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("sv_token");
  }
  return null;
};

const initialState: AuthState = {
  user: null,
  token: getInitialToken(),
  loading: false,
  error: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string; role: string; token?: string } | null>) => {
      if (action.payload) {
        state.user = { 
          email: action.payload.email, 
          role: action.payload.role, 
          userId: "", // default as it's missing from old type signature but shouldn't be used directly anyway 
        };
        if (action.payload.token) {
          state.token = action.payload.token;
          if (typeof window !== "undefined") localStorage.setItem("sv_token", action.payload.token);
        }
      } else {
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("sv_token");
      }
      state.authChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        // Only override user details, preserve the token we already have, unless new one is passed
        state.user = action.payload;
        if ((action.payload as any).token) {
          state.token = (action.payload as any).token;
          if (typeof window !== "undefined") localStorage.setItem("sv_token", state.token!);
        }
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("sv_token");
        state.authChecked = true;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if ((action.payload as any).token) {
          state.token = (action.payload as any).token;
          if (typeof window !== "undefined") localStorage.setItem("sv_token", (action.payload as any).token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if ((action.payload as any).token) {
          state.token = (action.payload as any).token;
          if (typeof window !== "undefined") localStorage.setItem("sv_token", (action.payload as any).token);
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("sv_token");
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("sv_token");
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
        state.token = null;
        if (typeof window !== "undefined") localStorage.removeItem("sv_token");
      });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;
