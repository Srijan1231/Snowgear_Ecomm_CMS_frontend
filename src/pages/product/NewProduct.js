import React, { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { postNewProductAction } from "./productAction";
import { SelectCategory } from "../../components/category/SelectCategory";
import { Link } from "react-router-dom";

const initialState = {
  status: "inactive",
};
export const NewProduct = () => {
  const dispatch = useDispatch();

  const inputs = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "salesPrice", label: "Sales Price", type: "text" },
    { name: "salesStartDate", label: "Sales Start Date", type: "Date" },
    { name: "salesEndDate", label: "Sales End Date", type: "Date" },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "qty", label: "Quantity", type: "number", required: true },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      placeholder: "product description....",
      required: true,
    },
  ];
  const [form, setForm] = useState(initialState);
  const [img, setImg] = useState([]);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnImgAttached = (e) => {
    const { files } = e.target;
    setImg(files);
    console.log(img);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formDt = new FormData();
    for (let key in form) {
      formDt.append(key, form[key]);
    }
    if (img.length) {
      [...img].forEach((item) => {
        formDt.append("image", item);
      });
    }
    console.log(formDt.get);
    dispatch(postNewProductAction(formDt));
  };
  return (
    <AdminLayout title="New Product">
      <div>
        <Link to="/product">
          <Button variant="dark">Goback</Button>
        </Link>

        <Form onSubmit={handleOnSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Check
              name="status"
              type="switch"
              label="Status"
              onChange={handleOnChange}
            />
          </Form.Group>

          <SelectCategory
            onChange={handleOnChange}
            name="parentCat"
            required={true}
          />

          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
          <Form.Group className="m-3">
            <Form.Control
              type="file"
              name="img"
              multiple
              onChange={handleOnImgAttached}
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="success" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};
