import api from "@/config/api";

import { CreateProductPayload} from "@/dto/products"; 


export const ProductService = {
  async create(payload: CreateProductPayload): Promise<productResponse> {
    const response = await api.post<productResponse>('/products', payload);
    return response.data;
  },

  


};
