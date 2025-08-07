export interface CreatePayload {
    name: string;
    slug: string;
  }

  export interface DepartmentResponse {
    id: number;
    created_at: string;       
    updated_at: string;       
    name: string;
    slug: string;   
    meta_title: string | null;
    meta_description: string | null;
    active: number;   
  }