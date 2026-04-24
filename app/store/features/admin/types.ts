export interface AdminDataState {
  stats: {
    totalPackages: number;
    totalBookings: number;
    totalTransfers: number;
    totalRevenue: number;
  } | null;
  recentBookings: any[];
  loading: boolean;
  error: string | null;
}
