import React from "react";
import { Button } from "react-bootstrap";

const EmptyDevicesContainer = ({ children, setShowModal }) => {
  return (
    <div className="mt-5">
      <h4 className="mb-3 text-muted">
        {children ? children : "Add your first device"}
      </h4>
      {!children && (
        <Button
          variant="outline-primary"
          onClick={() => setShowModal(true)}
          className="blue-shadow rounded-circle p-5"
        >
          <h3>Add</h3>
        </Button>
      )}
    </div>
  );
};

export default EmptyDevicesContainer;
