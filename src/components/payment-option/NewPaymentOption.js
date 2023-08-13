import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { postNewCatAction } from "../../pages/category/categoryAction";
import { CustomInput } from "../custom-input/CustomInput";
import { addNewPOAction } from "../../pages/payment-option/poAction";

const initalState = {
  status: "",
  title: "",
  description: "",
};

export const NewPaymentOption = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initalState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmmit = (e) => {
    e.preventDefault();

    dispatch(addNewPOAction(form));

    setForm(initalState);
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmmit}>
            <label htmlFor="">Status</label>
            <Form.Select name="status" onChange={handleOnChange} required>
              <option value="">--Select One --</option>
              <option value="active" selected={form.status === "active"}>
                Active
              </option>
              <option value="inactive" selected={form.status === "inactive"}>
                Inactive
              </option>
            </Form.Select>
            <CustomInput
              label="Title"
              name="title"
              placeholder="Pay By Credit Care"
              required
              onChange={handleOnChange}
              value={form.title}
            />
            <CustomInput
              as="textarea"
              rows={5}
              label="Description"
              name="description"
              placeholder="say how to make payment..."
              required
              onChange={handleOnChange}
              value={form.description}
            />

            <div className="d-grid mt-3">
              <Button variant="dark" type="submit">
                Add New Payment Option
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
