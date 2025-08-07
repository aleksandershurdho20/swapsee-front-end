import api from "@/config/api";

import { CreatePayload,  DepartmentResponse } from "@/dto/departments"; 


export const DepartmentService = {
  async create(payload: CreatePayload): Promise<DepartmentResponse> {
    const response = await api.post<DepartmentResponse>('/departments', payload);
    return response.data;
  },


};
