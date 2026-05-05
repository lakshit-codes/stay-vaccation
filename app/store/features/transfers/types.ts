import { Region } from "../regions/types";
export type { Region };

export interface TransferRecord {
  _id?: string;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  price: number;
  currency: string;
  duration?: string;
  defaultStartTime?: string;
  defaultEndTime?: string;
}

export interface TransfersState {
  transfers: TransferRecord[];
  loading: boolean;
  error: string | null;
}
