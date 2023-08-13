import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import { ProductTable } from "../../components/product/ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <AdminLayout title="Product">
      <div className="text-end">
        <Link to="/new-product">
          <Button variant="primary"> + Add New Product</Button>
        </Link>
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Product;
