import React from "react";
import { Row, Col } from "react-bootstrap";
import { DEFAULT_NAMES } from "../utils/constants";
import DevicesListContainer from "../components/DevicesListContainer";
import { filterDevicesByGroup } from "../utils/devices";
import EmptyDevicesContainer from "../components/EmptyDevicesContainer";
import DevicesColumnContainer from "../components/DevicesColumnContainer";

const AllDevicesDataContainer = ({
  devices,
  userId,
  allDevices,
  setShowModal,
  selectedState,
  group,
  view,
}) => {
  return (
    <>
      {devices.length > 0 && (
        <>
          {view === DEFAULT_NAMES.COLUMNS && (
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-2 mt-1">
              {filterDevicesByGroup(devices, group).map((device, i) => (
                <Col key={i}>
                  <DevicesColumnContainer device={device} userId={userId} />
                </Col>
              ))}
            </Row>
          )}
          {view === DEFAULT_NAMES.LIST && (
            <Row className="mt-3">
              <DevicesListContainer
                devices={devices}
                group={group}
                userId={userId}
              />
            </Row>
          )}
        </>
      )}
      {allDevices.length === 0 && view === DEFAULT_NAMES.COLUMNS && (
        <EmptyDevicesContainer setShowModal={setShowModal} />
      )}
      {devices &&
        filterDevicesByGroup(devices, group).length === 0 &&
        allDevices.length > 0 &&
        view === DEFAULT_NAMES.COLUMNS && (
          <EmptyDevicesContainer setShowModal={setShowModal}>
            No <strong>{selectedState}</strong> devices {group && "in group"}
            <strong> {group}</strong>
          </EmptyDevicesContainer>
        )}
    </>
  );
};

export default AllDevicesDataContainer;
