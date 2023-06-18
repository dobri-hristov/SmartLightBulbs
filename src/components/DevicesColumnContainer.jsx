import React, { useState } from "react";
import { Badge, Button, Card, Row, Col } from "react-bootstrap";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import BigDataPiece from "./common/BigDataPiece";
import { updateDevice } from "../firebase/updateDevice";
import CustomModal from "./CustomModal";
import deleteDevice from "../firebase/deleteDevice";
import TimerContainer from "./TimerContainer";
import { formatNumber } from "../utils/common";
import { DetailsButton, DeleteButton, TimeLeftButton } from "./common/Buttons";
import TimeLeftStatus from "./TimeLeftStatus";

const DevicesColumnContainer = ({ device, userId }) => {
  const { name, group, state, hours, initialHours, timeOn, temperature } =
    device;
  const [showModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteDevice(`${userId}`, `${name}_${group}`);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card className={`shadow ${state && "border-primary"}`}>
        <Card.Header className={`p-2 ${state && "text-light bg-primary"}`}>
          <strong>{name}</strong>
        </Card.Header>
        <Card.Body>
          <Button
            variant={state ? "primary" : "outline-primary"}
            className={`${state && "blue-shadow"} p-4 rounded-pill`}
            onClick={() => updateDevice(userId, device)}
          >
            {state ? <BsLightbulb size={40} /> : <BsLightbulbOff size={40} />}
          </Button>
          <div className="mt-3">
            <BigDataPiece text="Hours ON">
              {typeof timeOn !== "undefined" && timeOn !== 0 ? (
                <TimerContainer state={state} timeOn={timeOn} />
              ) : (
                <Badge bg={`${state ? "primary" : "secondary"}`}>
                  {"00:00:00"}
                </Badge>
              )}
            </BigDataPiece>
            <BigDataPiece text="Temperature">
              <Badge className="range-input text-black">
                {formatNumber(temperature)} K
              </Badge>
            </BigDataPiece>
            <BigDataPiece text="Timeleft status">
              <TimeLeftStatus
                currentHours={hours}
                initialHours={initialHours}
              />
            </BigDataPiece>
            <Row className="mx-auto mt-2">
              <Col className="px-1">
                <DetailsButton path={`${name}_${group}`} />
              </Col>
              <Col className="px-1">
                <TimeLeftButton
                  currentHours={hours}
                  initialHours={initialHours}
                />
              </Col>
              <Col className="px-1">
                <DeleteButton click={() => setShowDeleteModal(true)} />
              </Col>
            </Row>
          </div>
        </Card.Body>
        <Card.Footer className={`py-1 ${state && "text-light bg-primary"}`}>
          Group:<strong> {group}</strong>
        </Card.Footer>
      </Card>
      <CustomModal
        title="Delete Device"
        show={showModal}
        confirm={() => handleDelete()}
        hide={() => setShowDeleteModal(false)}
      >
        Are you sure you want to delete{" "}
        <strong className="text-danger">
          {name}_{group}
        </strong>{" "}
        ?
      </CustomModal>
    </>
  );
};

export default DevicesColumnContainer;
