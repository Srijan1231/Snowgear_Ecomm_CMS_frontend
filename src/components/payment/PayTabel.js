import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { EditPayForm } from "./EditPaymentForm";
import { useEffect, useState } from "react";
import { CustomModal } from "../customModal/CustomModal";
import { setModalShow } from "../../system/systemSlice";
import { getPayAction } from "../../pages/payment-option/paymentAction";

export const PayTable = () => {
  const dispatch = useDispatch();
  const [selectedPay, setSelectedPay] = useState({});
  const { payment } = useSelector((state) => state.paymentInfo);
  useEffect(() => {
    dispatch(getPayAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedPay(obj);
    dispatch(setModalShow(true));
  };
  return (
    <>
      <CustomModal title="Edit Category">
        <EditPayForm payment={selectedPay} />
      </CustomModal>
      <div className="d-flex justify-content-between mt-5">
        <div>Payment</div>
        <div>
          <Form.Control placeholder="Search by name ..." />
        </div>
      </div>
      <Table striped bordered hover className="mt-2 ">
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Title</th>

            <th>Added At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {payment.map(({ _id, status, title, createdAt }, i) => (
            <tr key={_id}>
              <td>{i + 1}</td>
              <td>
                <span
                  className={
                    status === "active"
                      ? "bg-success p-2 rounded"
                      : "bg-danger p-2 rounded"
                  }
                >
                  {status}
                </span>
              </td>
              <td> {title}</td>

              <td>{createdAt.slice(0, 10)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleOnEdit({ _id, status, title, createdAt })
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
