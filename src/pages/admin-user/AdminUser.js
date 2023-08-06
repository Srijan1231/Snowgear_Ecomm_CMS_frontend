import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AdminUser = () => {
  return (
    <AdminLayout title="Admin user">
      <div className="text-end">
        <Link to="/new-admin" className="nav-link">
          <Button variant="warning">Add New Admin</Button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminUser;
