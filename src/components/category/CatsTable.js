import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { EditCatForm } from "./EditCatForm";
import { useEffect, useState } from "react";
import { CustomModal } from "../customModal/CustomModal";
import { setModalShow } from "../../system/systemSlice";
import { getCatsAction } from "../../pages/category/categoryAction";

export const CatsTable = () => {
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState({});
  const { cats } = useSelector((state) => state.catInfo);
  useEffect(() => {
    dispatch(getCatsAction());
  }, [dispatch]);

  const handleOnEdit = (obj) => {
    setSelectedCat(obj);
    dispatch(setModalShow(true));
  };
  return (
    <>
      <CustomModal title="Edit Category">
        <EditCatForm cat={selectedCat} />
      </CustomModal>
      <div className="d-flex justify-content-between mt-5">
        <div>{cats.length} Category/ies Found</div>
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
            <th>Slug</th>
            <th>Added At</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {cats.map(({ _id, status, title, slug, createdAt }, i) => (
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
              <td>{slug}</td>
              <td>{createdAt.slice(0, 10)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() =>
                    handleOnEdit({ _id, status, title, slug, createdAt })
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
