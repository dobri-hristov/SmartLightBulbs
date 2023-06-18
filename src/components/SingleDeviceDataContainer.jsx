import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Accordion,
} from "react-bootstrap";
import { updateDevice } from "../firebase/updateDevice";
import BigDataPiece from "./common/BigDataPiece";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import TimerContainer from "./TimerContainer";
import CardDataContainer from "./common/CardDataContainer";
import { formatNumber } from "../utils/common";
import TimeLeftStatus from "./TimeLeftStatus";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { generateColumns, generatePeriodsData } from "../utils/device";
import { defaultSettings } from "../utils/bootstrap-table";
import { paginationOptions } from "../utils/pagination";
import { timeLeftContainer } from "../utils/time";

const SingleDeviceDataContainer = ({ device, userId }) => {
  const {
    group,
    state,
    timeOn,
    initialHours,
    watts,
    lumens,
    temperature,
    hours,
    timeOnPeriods,
  } = device;

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col className="mb-2" lg={3}>
          <Card className="text-center shadow">
            <Card.Header className={`p-2 ${state && "text-light bg-primary"}`}>
              State:
              <strong className={`text-${!state && "danger"}`}>
                {state ? " ON" : " OFF"}
              </strong>
            </Card.Header>
            <Card.Body>
              <Button
                variant={state ? "primary" : "outline-primary"}
                className={`${state && "blue-shadow"} p-5 rounded-pill mb-3`}
                onClick={() => updateDevice(userId, device)}
              >
                {state ? (
                  <BsLightbulb size={70} />
                ) : (
                  <BsLightbulbOff size={70} />
                )}
              </Button>
              <BigDataPiece text="Hours ON">
                {typeof timeOn !== "undefined" && timeOn !== 0 ? (
                  <TimerContainer state={state} timeOn={timeOn} />
                ) : (
                  <Badge bg={`${state ? "primary" : "secondary"}`}>
                    {"00:00:00"}
                  </Badge>
                )}
              </BigDataPiece>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row>
            <Col lg={3} xs={12} className="mb-2">
              <CardDataContainer title="Group">{group}</CardDataContainer>
            </Col>
            <Col lg={3} xs={12} className="mb-2">
              <CardDataContainer title="Life hours">
                &#8776; {formatNumber(initialHours / 3600)} h
              </CardDataContainer>
            </Col>
            <Col lg={3} xs={12} className="mb-2">
              <CardDataContainer title="Watts">
                {formatNumber(watts)} W
              </CardDataContainer>
            </Col>
            <Col lg={3} xs={12} className="mb-2">
              <CardDataContainer title="Lumens">
                {formatNumber(lumens)} LM
              </CardDataContainer>
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <CardDataContainer
                title={
                  <>
                    Color temperature:
                    <strong> {temperature} </strong>
                    (K)
                  </>
                }
              >
                <Form.Group>
                  <Form.Control
                    type="range"
                    min="1000"
                    max="10000"
                    disabled={true}
                    value={temperature}
                    className="range-input rounded-pill p-1 my-2"
                  />
                </Form.Group>
              </CardDataContainer>
            </Col>
          </Row>
          <Row>
            <Col>
              <CardDataContainer
                title={
                  <>
                    <strong>Timeleft: </strong>
                    <TimeLeftStatus
                      currentHours={hours}
                      initialHours={initialHours}
                    />
                  </>
                }
              >
                {timeLeftContainer(hours)}
              </CardDataContainer>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion
            defaultActiveKey={["0"]}
            alwaysOpen
            className="text-center shadow rounded"
          >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>Work's periods</strong>
              </Accordion.Header>
              <Accordion.Body>
                <BootstrapTable
                  {...defaultSettings}
                  keyField="uniqueKey"
                  data={timeOnPeriods ? generatePeriodsData(timeOnPeriods) : []}
                  columns={generateColumns()}
                  pagination={paginationFactory(
                    paginationOptions(timeOnPeriods ? timeOnPeriods : [])
                  )}
                  sort={{
                    dataField: "start",
                    order: "desc",
                  }}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleDeviceDataContainer;
