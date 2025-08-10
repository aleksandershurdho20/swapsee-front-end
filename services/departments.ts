import api from "@/config/api";

import { CreatePayload,  DepartmentResponse,UpdatePayload } from "@/dto/departments"; 


export const DepartmentService = {
  async create(payload: CreatePayload): Promise<DepartmentResponse> {
    const response = await api.post<DepartmentResponse>('/departments', payload);
    return response.data;
  },

  async update(id: string | number, payload: UpdatePayload): Promise<DepartmentResponse> {
    const response = await api.put<DepartmentResponse>(`/departments/${id}`, payload);
    return response.data;
  },

  // Delete a department
  async delete(id: string | number): Promise<void> {
    await api.delete(`/departments/${id}`);
  },


};
