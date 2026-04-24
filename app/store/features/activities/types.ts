import { MasterActivity } from "@/app/components/AdminCore";

export interface ActivitiesState {
  masterActivities: MasterActivity[];
  loading: boolean;
  error: string | null;
}
