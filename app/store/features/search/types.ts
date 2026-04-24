export interface SearchDestination {
  name: string;
  type: "city" | "state" | "destination";
  state?: string;
  country: string;
  slug: string;
  emoji: string;
  tags: string[];
  _score?: number;
}

export interface SearchState {
  results: SearchDestination[];
  popular: boolean;
  loading: boolean;
  error: string | null;
}
