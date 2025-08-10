import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { departmentStore } from '@/stores/departmentStore';
import { categoryStore } from '@/stores/categoryStore';
import DepartmentFormModal from './DepartmentFormModal';
import CategoryFormModal from './CategoryFormModal';
import { DepartmentTableProps, Department } from "@/types/department";
import { Category } from "@/types/category";

const DepartmentTable = observer(({ departments }: DepartmentTableProps) => {
  // Department modal state
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [deptModalMode, setDeptModalMode] = useState<'create' | 'edit'>('create');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();

  // Category modal state
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [catModalMode, setCatModalMode] = useState<'create' | 'edit'>('create');
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  // Expanded departments state
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string | number>>(new Set());

  const { categories } = categoryStore;



  // Department handlers
  const handleCreateDepartment = () => {
    setDeptModalMode('create');
    setSelectedDepartment(undefined);
    setIsDeptModalOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setDeptModalMode('edit');
    setSelectedDepartment(department);
    setIsDeptModalOpen(true);
  };

  const handleDeleteDepartment = async (department: Department) => {
    if (window.confirm(`Are you sure you want to delete "${department.name}"?`)) {
      try {
        await departmentStore.deleteDepartment(department.id);
      } catch (error) {
        // Error handling is done in the store
      }
    }
  };

  // Category handlers
  const handleCreateCategory = (departmentId?: string | number) => {
    setCatModalMode('create');
    setSelectedCategory(undefined);
    if (departmentId) {
      categoryStore.setFormData('department_id', departmentId);
    }
    setIsCatModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCatModalMode('edit');
    setSelectedCategory(category);
    setIsCatModalOpen(true);
  };

  const handleDeleteCategory = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      try {
        await categoryStore.deleteCategory(category.id);
      } catch (error) {
        // Error handling is done in the store
      }
    }
  };

  // Toggle department expansion
  const toggleDepartment = (departmentId: string | number) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(departmentId)) {
      newExpanded.delete(departmentId);
    } else {
      newExpanded.add(departmentId);
    }
    setExpandedDepartments(newExpanded);
  };

  // Get categories for a specific department
  const getCategoriesForDepartment = (departmentId: string | number) => {
    return categories?.filter(cat => cat.department_id === departmentId);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        {/* Header with Create Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Department & Category Management
          </h4>
          <div className="flex space-x-3">
            <button
              onClick={handleCreateDepartment}
              className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Department
            </button>
            <button
              onClick={() => handleCreateCategory()}
              className="inline-flex items-center justify-center rounded-md bg-green-600 py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Create Category
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Slug
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Type
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((department) => {
                  const departmentCategories = getCategoriesForDepartment(department.id);
                  const isExpanded = expandedDepartments.has(department.id);
                  
                  return (
                    <React.Fragment key={department.id}>
                      {/* Department Row */}
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                          <div className="flex items-center">
                            <button
                              onClick={() => toggleDepartment(department.id)}
                              className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              <svg
                                className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <div>
                              <h5 className="font-medium text-black dark:text-white">
                                {department.name}
                              </h5>
                              <p className="text-sm text-gray-500">{department.meta_title || 'No meta title'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{department.slug}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <span className="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Department
                          </span>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                              department.active === 1
                                ? "text-success bg-success"
                                : "text-danger bg-danger"
                            }`}
                          >
                            {department.active === 1 ? "Active" : "Inactive"}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <button 
                              className="hover:text-primary"
                              onClick={() => handleCreateCategory(department.id)}
                              title="Add Category"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                            <button 
                              className="hover:text-primary"
                              onClick={() => handleEditDepartment(department)}
                              title="Edit Department"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              className="hover:text-danger"
                              onClick={() => handleDeleteDepartment(department)}
                              title="Delete Department"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Categories Rows */}
                      {isExpanded && departmentCategories?.map((category) => (
                        <tr key={`cat-${category.id}`} className="bg-gray-25 dark:bg-gray-750">
                          <td className="border-b border-[#eee] py-4 px-4 pl-16 dark:border-strokedark xl:pl-20">
                            <div className="flex items-center">
                              <div className="w-4 h-4 mr-3 flex-shrink-0">
                                <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <h6 className="font-medium text-black dark:text-white">
                                  {category.name}
                                </h6>
                                <p className="text-sm text-gray-500">{category.meta_title || 'No meta title'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{category.slug}</p>
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                            <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                              Category
                            </span>
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                            <p
                              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                category.active === 1
                                  ? "text-success bg-success"
                                  : "text-danger bg-danger"
                              }`}
                            >
                              {category.active === 1 ? "Active" : "Inactive"}
                            </p>
                          </td>
                          <td className="border-b border-[#eee] py-4 px-4 dark:border-strokedark">
                            <div className="flex items-center space-x-3.5">
                              <button 
                                className="hover:text-primary"
                                onClick={() => handleEditCategory(category)}
                                title="Edit Category"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                className="hover:text-danger"
                                onClick={() => handleDeleteCategory(category)}
                                title="Delete Category"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Show message if department has no categories */}
                      {isExpanded && departmentCategories?.length === 0 && (
                        <tr className="bg-gray-25 dark:bg-gray-750">
                          <td colSpan={5} className="border-b border-[#eee] py-4 px-4 pl-16 dark:border-strokedark xl:pl-20 text-center">
                            <div className="text-gray-500 dark:text-gray-400">
                              <p className="text-sm">No categories in this department</p>
                              <button
                                onClick={() => handleCreateCategory(department.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm mt-1 underline"
                              >
                                Add your first category
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="border-b border-[#eee] py-8 px-4 dark:border-strokedark text-center">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-lg mb-2">No departments found</p>
                      <p className="text-sm">Click the "Create Department" button to add your first department.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <DepartmentFormModal
        isOpen={isDeptModalOpen}
        onClose={() => setIsDeptModalOpen(false)}
        mode={deptModalMode}
        department={selectedDepartment}
      />

      <CategoryFormModal
        isOpen={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        mode={catModalMode}
        category={selectedCategory}
      />
    </>
  );
});

export default DepartmentTable;