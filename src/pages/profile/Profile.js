import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../../helper/axios";
import { CustomModal } from "../../components/customModal/CustomModal";
import { setModalShow } from "../../system/systemSlice";
import { Link } from "react-router-dom";

const Profile = () => {
  const { admin } = useSelector((state) => state.adminInfo);
  const [form, setForm] = useState({});
  const [password, setPassword] = useState("");
  console.log(password);
  const [modal, setModal] = useState();
  useEffect(() => {
    setForm(admin);
  }, []);
  const dispatch = useDispatch();
  const inputs = [
    {
      label: "First Name",
      name: "fName",
      required: true,
      type: "text",
      placeholder: "First name",
      value: form.fName,
    },
    {
      label: "Last Name",
      name: "lName",
      required: true,
      type: "text",
      placeholder: "Last name",
      value: form.lName,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "Phone",
      value: form.phone,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "Address",
      value: form.address,
    },
    {
      label: "Email",
      name: "email",
      required: true,
      type: "text",
      placeholder: "Email",
      value: form.email,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnEdit = () => {
    setModal();
    dispatch(setModalShow(true));
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    // if (confirmPassword !== rest.password) {
    //   return toast.error("Password should match");
    // }
    // updateAdmin(form);
  };

  return (
    <AdminLayout title="Profile">
      Profile
      <Form>
        {inputs.map((itm, i) => (
          <CustomInput key={i} {...itm} onChange={handleOnChange} />
        ))}
        <br />
        <Button onClick={handleOnEdit}>Update Details</Button>
      </Form>
      <CustomModal title="Enter your password to update details">
        <form onSubmit={handleOnSubmit}>
          <label for="password">Password</label>
          <br />
          <input type="password" name="password" onChange={handleOnChange} />
          <br />
          <Button className="m-2" type="submit">
            Submit
          </Button>
        </form>
      </CustomModal>
      <div>
        <Link to={"/password-reset"}>
          <Button onClick={handleOnEdit} className="m-2">
            Update Password
          </Button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default Profile;
