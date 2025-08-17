import { makeAutoObservable, runInAction } from "mobx";
import api from "@/config/api";
import { ProductService } from "@/services/products";
import { toast } from "sonner";
import type { Product } from "@/types/product";
import type { CreateProductPayload } from "@/dto/products";

class ProductStore {
  products: Product[] = [];
  loading = false;
  formData: CreateProductPayload = {
    name: "",
    description: "",
    category_id: 0,
    department_id: 0,
    price: 0,
    status: "published", 
    quantity: null,
    created_by: 0,
    updated_by: 0, 
  };

  constructor() {
    makeAutoObservable(this);
  }

  setFormData = <K extends keyof CreateProductPayload>(
    field: K,
    value: CreateProductPayload[K]
  ) => {
    this.formData[field] = value;
  };

  fetchProducts = async () => {
    this.loading = true;
    try {
      const res = await ProductService.getAll()
      runInAction(() => {
        this.products = res.data;
      });
    } catch {
      toast.error("Failed to load products");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  createProduct = async () => {
    try {
      const payload = {
        ...this.formData,
        slug: this.generateSlug(this.formData.name),
      };

   
      const res = await ProductService.create(payload);

      runInAction(() => {
        this.products.push(res.product as Product);
        this.resetForm();
      });
      toast.success("Product created successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create product");
    }
  };

  updateProduct = async (id: string | number, userId: number) => {
    this.loading = true;
    try {
     

      const res = await ProductService.update(id, this.formData);
      runInAction(() => {
        const index = this.products.findIndex((p) => p.id === id);

        if (index !== -1) {
          this.products[index] = res.product as Product;
        }
        this.resetForm();
      });
      toast.success("Product updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update product");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteProduct = async (id: string | number) => {
    this.loading = true;
    try {
      await ProductService.delete(id);
      runInAction(() => {
        this.products = this.products.filter((p) => p.id !== id);
      });
      toast.success("Product deleted successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete product");
      throw err;
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  resetForm = () => {
    this.formData = {
      name: "",
      description: "",
      category_id: 0,
      department_id: 0,
      price: 0,
      status: "active",
      quantity: null,
      created_by: 0,
      updated_by: 0,
    };
  };

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
}

export const productStore = new ProductStore();