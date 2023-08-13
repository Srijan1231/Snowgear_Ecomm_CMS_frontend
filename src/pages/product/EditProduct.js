import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Form, Button } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { deleteProductAction, updateProductAction } from "./productAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectCategory } from "../../components/category/SelectCategory";
import { getProducts } from "../../helper/axios";

const EditProduct = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  console.log(_id);
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [imgs, setImgs] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  useEffect(() => {
    // (async () => {
    //   const { products } = await getProducts(_id);
    //   products?._id && setForm(products);
    // })();

    getSelectedProduct();
  }, []);

  const getSelectedProduct = async () => {
    const { products } = await getProducts(_id);
    products?._id && setForm(products);
  };

  const inputs = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Samsung T.V.",
      required: true,
      value: form.name,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",

      value: form.slug,
      disabled: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "SAM-TV-8",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      label: "QTY",
      type: "number",
      placeholder: "50",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "PRICE",
      type: "number",
      placeholder: "1000",
      required: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "800",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "Date",
      value: form?.salesStartDate?.slice(0, 10),
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "Date",
      value: form?.salesEndDate?.slice(0, 10),
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      placeholder: "product description ...",
      rows: "10",
      required: true,
      value: form.description,
    },
  ];

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "thumbnail" && imgToDelete.includes(value)) {
      return alert("Deleting image can't be set as thumbnail");
    }

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update this product?")) {
      return;
    }
    const formDt = new FormData();
    // set all from data in FormDate

    //remove: sku, slug, __v, createdAt, updatedAt
    let { sku, slug, __v, createdAt, updatedAt, ...rest } = form;

    //remove all the url form rest.images which matches the urls in imgToDelete

    rest.images = rest.images.filter((url) => !imgToDelete.includes(url));

    console.log(rest);

    for (let key in rest) {
      formDt.append(key, rest[key]);
    }

    // check if there is any new image is being added
    if (imgs.length) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    const isUpdated = await dispatch(updateProductAction(formDt));

    isUpdated && getSelectedProduct();
    setImgToDelete([]);
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const isDeleted = await dispatch(deleteProductAction(_id));

      isDeleted && navigate("/product");
    }
  };

  const handleOnDeleteSelect = (e) => {
    const { value, checked } = e.target;
    if (value === form.thumbnail) {
      return alert(
        "You can't delete the thumbnail, choose another thumbnail first"
      );
    }

    checked
      ? setImgToDelete([...imgToDelete, value])
      : setImgToDelete(imgToDelete.filter((url) => url !== value));
  };

  return (
    <AdminLayout title="Edit Product">
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
              checked={form.status === "active"}
            />
          </Form.Group>

          <SelectCategory
            onChange={handleOnChange}
            name="parentCat"
            required={true}
            _id={form.parentCat}
          />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="py-5 d-flex justify-content-between">
            {form.images?.map((url) => (
              <div>
                <div>
                  <input
                    type="radio"
                    name="thumbnail"
                    checked={url === form.thumbnail}
                    value={url}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="">Thumbnail</label>
                </div>
                <img
                  className="img-thumbnail"
                  key={url}
                  src={process.env.REACT_APP_ROOTSERVER + url?.slice(6)}
                  alt=""
                  width="150px"
                />

                <div>
                  <Form.Check
                    label="Delete"
                    value={url}
                    onChange={handleOnDeleteSelect}
                    checked={imgToDelete.includes(url)}
                  />
                </div>
              </div>
            ))}
          </div>

          <Form.Group className="mb-3 mt-3">
            <Form.Control
              type="file"
              name="img"
              multiple
              onChange={handleOnImageAtached}
            />
          </Form.Group>
          <div className="d-grid mt-3 mb-3">
            <Button variant="success" type="submit">
              Update Product
            </Button>
          </div>
        </Form>

        <div className="d-grid mb-3">
          <Button onClick={handleOnDelete} variant="danger">
            Delete this product
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
