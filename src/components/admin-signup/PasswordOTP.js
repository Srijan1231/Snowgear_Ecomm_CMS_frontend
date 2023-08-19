import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";

export const PasswordOTP = ({ handleOnOtpRequest }) => {
  const emailRef = useRef("");
  const handleOnOTPRequest = () => {
    const { value } = emailRef.current;
    if (value) {
      handleOnOtpRequest(value);
    }
  };
  return (
    <Form>
      <h3>Request OTP</h3>
      <hr />
      <CustomInput
        label="Email"
        placeholder="Enter your email address"
        someRef={emailRef}
      />
      <div className="d-grid mt-3">
        <Button onClick={handleOnOTPRequest}>Request OTP</Button>
      </div>
    </Form>
  );
};
