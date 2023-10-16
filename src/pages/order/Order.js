import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { OrderTable } from "./OrderTable";

const Order = () => {
  return (
    <AdminLayout title="Order/s">
      <OrderTable />
    </AdminLayout>
  );
};

export default Order;
