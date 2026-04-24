import { MasterHotel } from "@/app/components/AdminCore";

export interface HotelsState {
  masterHotels: MasterHotel[];
  loading: boolean;
  error: string | null;
}
