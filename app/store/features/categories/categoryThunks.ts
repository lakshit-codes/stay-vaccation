import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../../apiUtils";
import { CategoriesState } from "./types";
import { Category } from "@/app/components/AdminCore";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    return apiFetch<Category[]>("/api/categories");
  },
  {
    condition: (_, { getState }) => {
      const { categories } = getState() as { categories: CategoriesState };
      if (categories.loading || categories.categories.length > 0) {
        return false;
      }
    },
  }
);

export const createCategory = createAsyncThunk("categories/createCategory", async (cat: Partial<Category>) => {
  return apiFetch<Category>("/api/categories", {
    method: "POST",
    body: JSON.stringify(cat),
  });
});

export const updateCategory = createAsyncThunk("categories/updateCategory", async (cat: Category) => {
  return apiFetch<Category>(`/api/categories/${cat._id}`, {
    method: "PUT",
    body: JSON.stringify(cat),
  });
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (id: string) => {
  await apiFetch(`/api/categories/${id}`, {
    method: "DELETE",
  });
  return id;
});
