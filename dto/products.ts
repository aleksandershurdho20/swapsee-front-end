export interface CreateProductPayload {
    name: string;
    slug?: string;
    description: string;
    category_id: number;
    department_id: number;
    price: number;
    status: string;
    quantity?: number | null;
    created_by: number;
    updated_by: number;
  }
  
  export interface Product extends CreateProductPayload {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }