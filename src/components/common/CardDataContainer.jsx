import React from "react";
import { Card } from "react-bootstrap";

const CardDataContainer = ({ children, title }) => {
  return (
    <Card className="text-center shadow">
      <Card.Header className="p-1">
        <strong>{title}</strong>
      </Card.Header>
      <Card.Body className="p-2">{children}</Card.Body>
    </Card>
  );
};

export default CardDataContainer;
