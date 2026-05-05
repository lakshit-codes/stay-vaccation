export interface MasterActivity {
  _id: string;
  title: string;
  description: string;
  activityType: string;
  defaultDuration: string;
  location: string;
  state?: string;
  country?: string;
  price?: number;
  discountPrice?: number;
  rating?: number;
  highlights?: string[];
  isEnabled?: boolean;
  destinationSlug?: string;
  tags: string[];
  images: string[];
}

export interface ActivitiesState {
  masterActivities: MasterActivity[];
  loading: boolean;
  error: string | null;
}
