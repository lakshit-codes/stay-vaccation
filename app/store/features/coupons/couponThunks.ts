import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { CouponsState } from "./types";
import { Coupon } from "@/app/components/AdminCore";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    return apiFetch<Coupon[]>("/api/coupons");
  },
  {
    condition: (_, { getState }) => {
      const { coupons } = getState() as { coupons: CouponsState };
      if (coupons.loading || coupons.coupons.length > 0) {
        return false;
      }
    },
  }
);

export const createCoupon = createAsyncThunk("coupons/createCoupon", async (coupon: Partial<Coupon>) => {
  return apiFetch<Coupon>("/api/coupons", {
    method: "POST",
    body: JSON.stringify(coupon),
  });
});

export const updateCoupon = createAsyncThunk("coupons/updateCoupon", async (coupon: Coupon) => {
  return apiFetch<Coupon>("/api/coupons", {
    method: "PUT",
    body: JSON.stringify(coupon),
  });
});

export const deleteCoupon = createAsyncThunk("coupons/deleteCoupon", async (id: string) => {
  await apiFetch(`/api/coupons?id=${id}`, {
    method: "DELETE",
  });
  return id;
});
