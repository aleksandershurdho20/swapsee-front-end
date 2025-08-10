export interface Category {
    id: string | number;
    name: string;
    slug: string;
    department_id: string | number;
    active: number;
    meta_title?: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface CategoryTableProps {
    categories: Category[];
  }
  
  // dto/categories.ts
  export interface CreateCategoryPayload {
    name: string;
    slug: string;
    department_id: string | number;
  }
  
  export interface UpdateCategoryPayload extends CreateCategoryPayload {}
  
  export interface CategoryResponse {
    data: Category;
    message?: string;
  }