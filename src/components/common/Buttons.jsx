import React from "react";
import { Button, OverlayTrigger, Popover, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineInfo } from "react-icons/md";
import { AiOutlineDelete, AiOutlineFieldTime } from "react-icons/ai";
import { timeLeftContainer } from "../../utils/time";

export const DetailsButton = ({ path }) => {
  return (
    <Button
      as={Link}
      to={path}
      title="more details"
      variant="outline-warning w-100"
    >
      <MdOutlineInfo size={20} color="black" />
    </Button>
  );
};

export const DeleteButton = ({ click }) => {
  const handleclick = () => click();
  return (
    <Button
      variant="outline-danger w-100"
      title="delete device"
      onClick={() => handleclick()}
    >
      <AiOutlineDelete size={20} color="black" />
    </Button>
  );
};

export const TimeLeftButton = ({ currentHours, initialHours }) => {
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Popover className="dark-shadow">
          <Popover.Header as="h3">
            <Row className="align-items-center">
              <Col className="px-1">Timeleft</Col>
              <Col className="text-end px-1"></Col>
            </Row>
          </Popover.Header>
          <Popover.Body>{timeLeftContainer(currentHours)}</Popover.Body>
        </Popover>
      }
    >
      <Button variant="outline-primary w-100">
        <AiOutlineFieldTime size={20} color="black" />
      </Button>
    </OverlayTrigger>
  );
};
