import React, { useEffect, useState } from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import CustomModal from "../components/CustomModal";
import { REFS, DEFAULT_NAMES } from "../utils/constants";
import AddDeviceForm from "../components/AddDeviceForm";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { filterDevicesByState } from "../utils/devices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUserDefaultView,
  getUserDefaultGroup,
  getUserDefaultState,
} from "../utils/user";
import { getAllDevicesOnce } from "../firebase/getDevices";
import { filterGroups } from "../utils/devices";
import AllDevicesDataContainer from "../components/AllDevicesDataContainer";
import FilterDevicesRow from "../components/FilterDevicesRow";

const Devices = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const [group, setGroup] = useState(getUserDefaultGroup(DEFAULT_NAMES.GROUP));
  const [allGroups, setAllGroups] = useState([]);
  const [devices, setDevices] = useState([]);
  const [allDevices, setAllDevices] = useState([]);
  const { user, isAuth } = useSelector((state) => state.auth);
  const [view, setView] = useState(
    getUserDefaultView(DEFAULT_NAMES.VIEW) || DEFAULT_NAMES.COLUMNS
  );
  const [selectedState, setSelectedState] = useState(
    getUserDefaultState(DEFAULT_NAMES.STATE)
  );

  useEffect(() => {
    setDevices(false);
    setAllDevices(false);
    user &&
      onValue(ref(db, `${REFS.DEVICES}/${user.userId}`), (snapshot) => {
        setDevices([]);
        setAllDevices([]);
        const data = snapshot.val();
        if (data !== null) {
          Object.values(data).map((device) => {
            setAllDevices((oldArray) => [...oldArray, device]);
            const filterDevice = filterDevicesByState(device, selectedState);
            filterDevice &&
              setDevices((oldArray) => [...oldArray, filterDevice]);
          });
        }
      });
  }, [user, selectedState]);

  useEffect(() => {
    user &&
      getAllDevicesOnce(user.userId).then((devices) =>
        setAllGroups(filterGroups(devices))
      );
  }, [devices]);

  return (
    <div className="text-center page">
      <Row className="border-bottom  pb-2">
        <Col className="text-start d-flex">
          <h3 className="m-0">{title}</h3>
          {isAuth && (
            <Badge
              className="align-self-baseline mx-1 rounded-pill"
              bg="danger"
            >
              {allDevices.length}
            </Badge>
          )}
        </Col>
        <Col className="text-end">
          <Row>
            <Col></Col>
            <Col>
              <Button onClick={() => setShowModal(!showModal)}>
                Add Device
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {isAuth && (
        <>
          <FilterDevicesRow
            devices={devices}
            group={group}
            selectedState={selectedState}
            setGroup={setGroup}
            view={view}
            setView={setView}
            setSelectedState={setSelectedState}
            allGroups={allGroups}
          />
          <AllDevicesDataContainer
            devices={devices}
            userId={user.userId}
            allDevices={allDevices}
            setShowModal={setShowModal}
            selectedState={selectedState}
            group={group}
            view={view}
          />
        </>
      )}
      <CustomModal
        title="Add Device"
        show={showModal}
        hide={() => setShowModal(false)}
      >
        {user ? (
          <AddDeviceForm userId={user.userId} setShowModal={setShowModal} />
        ) : (
          <div>
            First you need to login to your account{" "}
            <Button variant="primary px-2" as={Link} to="/login">
              Click here
            </Button>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default Devices;
