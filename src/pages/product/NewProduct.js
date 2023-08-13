import React, { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Form, Button } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { postNewProductAction } from "./productAction";
import { Link } from "react-router-dom";
import { SelectCategory } from "../../components/category/SelectCategory";

const initialState = {
  status: "inactive",
};

const NewProduct = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [imgs, setImgs] = useState([]);
  const inputs = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Samsung T.V.",
      required: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "SAM-TV-8",
      required: true,
    },
    {
      name: "qty",
      label: "QTY",
      type: "number",
      placeholder: "50",
      required: true,
    },
    {
      name: "price",
      label: "PRICE",
      type: "number",
      placeholder: "1000",
      required: true,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "800",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "Date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "Date",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      placeholder: "product description ...",
      rows: "10",
      required: true,
    },
  ];

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

  const handleOnImageAtached = (e) => {
    const { files } = e.target;

    setImgs(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formDt = new FormData();
    // set all from data in FormDate

    for (let key in form) {
      formDt.append(key, form[key]);
    }

    // check if there is any new image is being added
    if (imgs.length) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    dispatch(postNewProductAction(formDt));
  };

  return (
    <AdminLayout title="New Product">
      <Link to="/product">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <div className="mt-4">
        <Form onSubmit={handleOnSubmit}>
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

          <Form.Group className="mb-3 mt-3">
            <Form.Control
              type="file"
              name="img"
              multiple
              onChange={handleOnImageAtached}
              required={true}
            />
          </Form.Group>
          <div className="d-grid mt-3 mb-3">
            <Button variant="success" type="submit">
              Add Product
            </Button>
          </div>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
