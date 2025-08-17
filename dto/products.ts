
interface BaseProductDto {
  name: string;
  description: string;
  price: number;
  status: string;
}

export interface CreateProductPayload extends BaseProductDto {
  slug?: string;
  category_id: number;
  department_id: number;
  quantity?: number | null;
  created_by: number;
  updated_by: number;
}

export interface UpdateProductPayload extends Partial<BaseProductDto> {
  id: number;
  slug?: string;
  category_id?: number;
  department_id?: number;
  quantity?: number | null;
  updated_by: number; 
}

export interface Product extends BaseProductDto {
  id: number;
  slug: string;
  category_id: number;
  department_id: number;
  quantity: number | null;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued'
}

export interface ProductFilters {
  category_id?: number;
  department_id?: number;
  status?: ProductStatus;
  min_price?: number;
  max_price?: number;
  search?: string;
}