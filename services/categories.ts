import api from "@/config/api";
import { CreateCategoryPayload, CategoryResponse, UpdateCategoryPayload } from "@/dto/categories";

export const CategoryService = {
  // Create a new category
  async create(payload: CreateCategoryPayload): Promise<CategoryResponse> {
    const response = await api.post<CategoryResponse>('/categories', payload);
    return response.data;
  },

  // Update an existing category
  async update(id: string | number, payload: UpdateCategoryPayload): Promise<CategoryResponse> {
    const response = await api.put<CategoryResponse>(`/categories/${id}`, payload);
    return response.data;
  },

  // Delete a category
  async delete(id: string | number): Promise<void> {
    await api.delete(`/categories/${id}`);
  },

  // Get categories by department
  async getByDepartment(departmentId: string | number): Promise<{ data: Category[] }> {
    const response = await api.get(`/categories?department_id=${departmentId}`);
    return response.data;
  },

  // Get all categories
  async getAll(): Promise<{ data: Category[] }> {
    const response = await api.get('/categories');
    return response.data;
  }
};
