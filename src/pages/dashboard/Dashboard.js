import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Chart } from "./Chart";

const Dashboard = () => {
  return (
    <AdminLayout title="Dashboard">
      <Chart />
    </AdminLayout>
  );
};

export default Dashboard;
