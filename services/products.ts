import api from "@/config/api";

import { CreateProductPayload,UpdateProductPayload,Product} from "@/dto/products"; 


export const ProductService = {
  async create(payload: CreateProductPayload): Promise<Product> {
    const response = await api.post<Product>('/products', payload);
    return response.data.data;
  },


  async getAll(): Promise<{ data: Product[] }> {
    const response = await api.get('/products');
    return response.data;
  },
  

  async update(id: string | number, payload: UpdateProductPayload): Promise<Product> {
    const response = await api.put<Product>(`/products/${id}`, payload);
    return response.data.data;
  },


};
