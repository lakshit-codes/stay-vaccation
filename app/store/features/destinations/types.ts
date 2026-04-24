import { Destination } from "@/app/components/AdminCore";

export interface DestinationsState {
  destinations: Destination[];
  trendingIndia: Destination[];
  trendingInternational: Destination[];
  loading: boolean;
  error: string | null;
}
