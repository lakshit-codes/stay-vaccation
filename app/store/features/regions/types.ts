import { Region } from "@/app/components/AdminCore";

export interface RegionsState {
  regions: Region[];
  loading: boolean;
  error: string | null;
}
