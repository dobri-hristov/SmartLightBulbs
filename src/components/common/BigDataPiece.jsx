import React from "react";
import { Row, Col } from "react-bootstrap";

const BigDataPiece = ({ children, text }) => {
  return (
    <Row>
      <Col className="text-end">{text}:</Col>
      <Col className="text-start p-0">{children}</Col>
    </Row>
  );
};

export default BigDataPiece;
