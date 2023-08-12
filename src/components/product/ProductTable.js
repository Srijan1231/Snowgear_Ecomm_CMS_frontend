import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export const ProductTable = () => {
  const { product } = useSelector((state) => state.productInfo);
  return (
    <div className="mt-5">
      <div className="d-flex m-2 p-3 gap-3 ">
        <div>{product.length} product/s found</div>
        <div className="pb-2">
          <Form.Control type="text" />
        </div>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{item.Thumbnail}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{<Button variant="warning">Edit</Button>}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
