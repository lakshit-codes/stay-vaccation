export interface Region {
  _id: string;
  name: string;
  icon: string;
  order: number;
  isActive?: boolean;
}

export interface RegionsState {
  regions: Region[];
  loading: boolean;
  error: string | null;
}
