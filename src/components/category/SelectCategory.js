import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export const SelectCategory = (props) => {
  const { cats } = useSelector((state) => state.catInfo);
  return (
    <Form.Group className="mb-3">
      <Form.Select {...props}>
        <option value="">-- select one --</option>

        {cats.map((item) => (
          <option
            key={item._id}
            value={item._id}
            selected={item._id === props._id}
          >
            {item.title}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
