import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";

import { postNewPayAction } from "../../pages/payment-option/paymentAction";

export const NewPayForm = () => {
  const dispatch = useDispatch();
  const nameRef = useRef();

  const handleOnAddPay = () => {
    const { value } = nameRef.current;
    value && dispatch(postNewPayAction({ title: value }));
  };

  return (
    <div className="border p-4 rounded shadow-lg">
      <Row>
        <Col>
          <Form.Control placeholder="Type of payment methods" ref={nameRef} />
        </Col>
        <Col className="d-grid">
          <Button variant="dark" onClick={handleOnAddPay}>
            Add New Payment Option
          </Button>
        </Col>
      </Row>
    </div>
  );
};
