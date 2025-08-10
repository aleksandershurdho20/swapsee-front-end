import { makeAutoObservable, runInAction } from "mobx";
import api from "@/config/api";
import { CategoryService } from "@/services/categories";
import { toast } from "sonner";
import type { Category } from "@/types/category";
import { CreateCategoryPayload } from "@/dto/categories";

class CategoryStore {
  categories: Category[] = [];
  loading = false;
  formData: CreateCategoryPayload = { 
    name: "", 
    parent_id: "", 
    department_id: "" 
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFormData = <K extends keyof CreateCategoryPayload>(field: K, value: CreateCategoryPayload[K]) => {
    this.formData[field] = value;
  };

  resetForm = () => {
    this.formData = { name: "", parent_id: "", department_id: "" };
  };

  fetchCategories = async () => {
    this.loading = true;
    try {
      const res = await CategoryService.getAll();
      runInAction(() => {
        this.categories = res.data;
      });
    } catch {
      toast.error("Failed to load categories");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  fetchCategoriesByDepartment = async (departmentId: string | number) => {
    this.loading = true;
    try {
      const res = await CategoryService.getByDepartment(departmentId);
      runInAction(() => {
        this.categories = res.data;
      });
    } catch {
      toast.error("Failed to load categories");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createCategory = async () => {
    this.loading = true;
    try {
      const res = await CategoryService.create(this.formData);
      runInAction(() => {
        this.categories.push(res.data as Category);
        this.resetForm();
      });
      toast.success("Category created successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create category");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateCategory = async (id: string | number) => {
    this.loading = true;
    try {
      const res = await CategoryService.update(id, this.formData);
      runInAction(() => {
        const index = this.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
          this.categories[index] = res.data as Category;
        }
        this.resetForm();
      });
      toast.success("Category updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update category");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteCategory = async (id: string | number) => {
    this.loading = true;
    try {
      await CategoryService.delete(id);
      runInAction(() => {
        this.categories = this.categories.filter(cat => cat.id !== id);
      });
      toast.success("Category deleted successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete category");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export const categoryStore = new CategoryStore();