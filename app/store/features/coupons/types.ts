import { Coupon } from "@/app/components/AdminCore";

export interface CouponsState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}
