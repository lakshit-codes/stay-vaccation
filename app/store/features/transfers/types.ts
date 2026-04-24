import { TransferRecord } from "@/app/components/AdminCore";

export interface TransfersState {
  transfers: TransferRecord[];
  loading: boolean;
  error: string | null;
}
