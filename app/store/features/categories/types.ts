import { Category } from "@/app/components/AdminCore";

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
