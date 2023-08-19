import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";

export const PasswordReset = ({ setForm }) => {
  const [formDt, setFormDt] = useState("");
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "confirmPassword") {
      value !== formDt.confirmPassword
        ? setError("Password should match")
        : setError("");
    }

    if (name === "password") {
      value.length < 6 && setError("At least 6 characters required");
      !/[0-9]/.test(value) && setError("At least one number is required ");
      !/[A-Z]/.test(value) && setError("At least one uppercase is required ");
      !/[a-z]/.test(value) && setError("At least one lowercase is required ");

      setFormDt({ ...formDt, [name]: value });
    }
  };
  const handleOnSubmit = () => {};
  return (
    <Form>
      <h3>Reset New Password</h3>
      <hr />
      <CustomInput label="OTP" placeholder="Enter  the OTP" required={true} />
      <CustomInput
        label="Password"
        placeholder="Enter your new password"
        type="password"
        required={true}
      />
      <CustomInput
        label="Confirm Password"
        placeholder="Re-enter your Password "
        type="password"
        required={true}
      />
      <div className="d-grid mt-3">
        <Button type="submit" onChange={handleOnChange}>
          Change Password
        </Button>
      </div>
      <div className="text-end py-3">
        Didn't receive otpGenerator
        <a onClick={() => setForm("otp")} href="#!">
          Request Again
        </a>
      </div>
    </Form>
  );
};
