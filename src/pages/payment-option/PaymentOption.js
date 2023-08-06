import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { NewPayForm } from "../../components/payment/NewPayForm";
import { PayTable } from "../../components/payment/PayTabel";

const PaymentOption = () => {
  return (
    <AdminLayout title="Payment Option">
      <NewPayForm />
      <PayTable />
    </AdminLayout>
  );
};

export default PaymentOption;
