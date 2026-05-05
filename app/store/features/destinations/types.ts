export type DestinationStatus = "Visible" | "Hidden" | "Draft" | "Unpublished";

export interface Destination {
  _id: string;
  name: string;
  slug: string;
  regionId: string;
  image: string;
  description: string;
  isEnabled: boolean;
  isActive: boolean;
  packageCount?: number;
  isTrending?: boolean;
  category?: "India" | "International";
  displayOrder?: number;
  status: DestinationStatus;
}

export interface DestinationsState {
  destinations: Destination[];
  trendingIndia: Destination[];
  trendingInternational: Destination[];
  loading: boolean;
  error: string | null;
}
