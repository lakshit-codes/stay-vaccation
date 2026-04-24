import { createSlice } from "@reduxjs/toolkit";
import { CouponsState } from "./types";
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "./couponThunks";

const initialState: CouponsState = {
  coupons: [],
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    setCoupons: (state, action) => {
      state.coupons = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coupons";
      })
      // Create
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.unshift(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create coupon";
      })
      // Update
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.coupons.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.coupons[index] = action.payload;
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update coupon";
      })
      // Delete
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter((c) => c._id !== action.payload);
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete coupon";
      });
  },
});

export const { setCoupons } = couponSlice.actions;
export default couponSlice.reducer;
