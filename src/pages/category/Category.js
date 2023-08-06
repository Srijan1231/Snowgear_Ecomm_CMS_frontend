import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { NewCatForm } from "../../components/category/NewCatForm";
import { CatsTable } from "../../components/category/CatsTable";

const Category = () => {
  return (
    <AdminLayout title="Category">
      <NewCatForm />

      <CatsTable />
    </AdminLayout>
  );
};

export default Category;
