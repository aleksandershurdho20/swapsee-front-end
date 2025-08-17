import api from "@/config/api";

import { CreateProductPayload} from "@/dto/products"; 
import { Product } from "@/types/product";


export const ProductService = {
  async create(payload: CreateProductPayload): Promise<Product> {
    const response = await api.post<Product>('/products', payload);
    return response.data;
  },


  async getAll(): Promise<{ data: Product[] }> {
    const response = await api.get('/products');
    return response.data;
  }
  


};
