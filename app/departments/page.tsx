"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DepartmentTable from "@/components/Departments/Table";
import { useEffect } from "react";
import { toast } from "sonner";
import { departmentStore } from "@/stores/departmentStore";
import { observer } from "mobx-react-lite";

const Departments = observer(() => {
  const { formData, setFormData, createDepartment, fetchDepartments, departments } = departmentStore;

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(name as "name" | "slug", value);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDepartment();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Departments" />
      <DepartmentTable departments={departments} />
    </>
  );
});

export default Departments;
