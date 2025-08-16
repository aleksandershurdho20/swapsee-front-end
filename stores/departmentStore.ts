import { makeAutoObservable, runInAction } from "mobx";
import api from "@/config/api";
import { DepartmentService } from "@/services/departments";
import { toast } from "sonner";
import type { Department } from "@/types/department";
import { CreatePayload,   } from "@/dto/departments"; 

class DepartmentStore {
  departments: Department[] = [];
  loading = false;
  formData: CreatePayload = { name: "", slug: "" };

  constructor() {
    makeAutoObservable(this);
  }

  setFormData = <K extends keyof CreatePayload>(field: K, value: CreatePayload[K]) => {
    this.formData[field] = value;
  };

  fetchDepartments = async () => {
    this.loading = true;
    try {
      const res = await api.get<Department[]>("/departments");
      runInAction(() => {
        this.departments = res.data;
      });
    } catch {
      toast.error("Failed to load departments");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createDepartment = async () => {
    try {
      const res = await DepartmentService.create(this.formData);

      runInAction(() => {
        this.departments.push(res.department as Department);
        this.formData = { name: "", slug: "" };
      });
      toast.success("Department created successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create department");
    }
  };

  resetForm = () => {
    this.formData = { name: "", slug: "" };
  };

  deleteDepartment = async (id: string | number) => {
    this.loading = true;
    try {
      // await DepartmentService.delete(id);
      runInAction(() => {
        this.departments = this.departments.filter(dept => dept.id !== id);
      });
      toast.success("Department deleted successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete department");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateDepartment = async (id: string | number) => {
    this.loading = true;
    try {
      const res = await DepartmentService.update(id, this.formData);
      runInAction(() => {
        const index = this.departments.findIndex(dept => dept.id === id);

        if (index !== -1) {
          this.departments[index] = res.department as Department;
        }
        this.resetForm();
      });
      toast.success("Department updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update department");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}

export const departmentStore = new DepartmentStore();
