import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { postNewCatAction } from "../../pages/category/categoryAction";

export const NewCatForm = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();

  const handleOnAddCat = () => {
    const { value } = nameRef.current;
    value && dispatch(postNewCatAction({ title: value }));
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <Row>
        <Col>
          <Form.Control placeholder="Electronics" ref={nameRef} />
        </Col>
        <Col className="d-grid">
          <Button variant="dark" onClick={handleOnAddCat}>
            Add New Category
          </Button>
        </Col>
      </Row>
    </div>
  );
};
