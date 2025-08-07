"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DepartmentService } from "@/services/departments";
import { useState } from "react";
import { toast } from "sonner";

const Departments = () => {
  const [data, setData] = useState({
    name: "",
    slug: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await DepartmentService.create(data);
    } catch (error) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Departments" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Department
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Department name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="Department name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="slug"
                  value={data.slug}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </>
  );
};

export default Departments;
