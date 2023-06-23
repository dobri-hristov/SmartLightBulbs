import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { REFS } from "../utils/constants";
import SingleDeviceDataContainer from "../components/SingleDeviceDataContainer";
import moment from "moment";

const Device = ({ title }) => {
  const { name } = useParams();
  const [device, setdevice] = useState();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    user &&
      onValue(ref(db, `${REFS.DEVICES}/${user.userId}/${name}`), (snapshot) => {
        const data = snapshot.val();
        data !== null && setdevice(data);
      });
  }, [user]);

  return (
    <div className="page">
      {device && (
        <>
          <Row className="border-bottom align-items-center pb-2">
            <Col>
              <h3 className="m-0">
                {title}:
                <span className="fst-italic text-primary"> {device.name}</span>
              </h3>
            </Col>
            <Col className="text-end">
              Added on:{" "}
              <Badge>
                {moment(device.addDate).format("MMMM Do YYYY, h:mm:ss a ")}
              </Badge>
            </Col>
          </Row>
          <SingleDeviceDataContainer device={device} userId={user.userId} />
        </>
      )}
    </div>
  );
};

export default Device;
