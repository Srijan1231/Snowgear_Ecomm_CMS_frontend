import React from "react";
import { Form } from "react-bootstrap";

export const CustomInput = ({ label, someRef, ...rest }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} ref={someRef} />
    </Form.Group>
  );
};
