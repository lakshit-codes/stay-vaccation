export interface Booking {
  id: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  packageId?: string;
  packageTitle?: string;
  totalAmount: number;
  currency: string;
  status: "pending" | "confirmed" | "cancelled";
  travelDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  notes?: string;
}

export interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
}
