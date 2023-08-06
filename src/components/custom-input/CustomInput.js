import React from "react";
import { Form } from "react-bootstrap";

export const CustomInput = ({ label, ...rest }) => {
  return (
    <Form.Group className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
    </Form.Group>
  );
};
