export interface Coupon {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  description: string;
  minOrderValue: number;
  maxUses: number;
  usedCount: number;
  isActive: boolean;
  expiryDate: string;
}

export interface CouponsState {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
}
