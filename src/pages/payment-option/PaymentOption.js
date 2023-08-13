import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { NewPaymentOption } from "../../components/payment-option/NewPaymentOption";
import { PaymentOptionTable } from "../../components/payment-option/PaymentOptionTable";

const PaymentOption = () => {
  return (
    <AdminLayout title="Payment Option">
      <NewPaymentOption />

      <PaymentOptionTable />
    </AdminLayout>
  );
};

export default PaymentOption;
