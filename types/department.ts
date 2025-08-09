export type Department = {
    id: number;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    meta_title: string | null;
    meta_description: string | null;
    active: number;
  };
  


  export type DepartmentTableProps= {
    departments: Department[];
  }