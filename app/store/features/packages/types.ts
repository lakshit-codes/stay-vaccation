import { Package } from "@/app/components/AdminCore";

export interface PackagesState {
  packages: Package[];
  loading: boolean;
  error: string | null;
}
