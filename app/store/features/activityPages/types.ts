import { ActivityPage } from "@/app/components/AdminCore";

export interface ActivityPagesState {
  activityPages: ActivityPage[];
  loading: boolean;
  error: string | null;
}
