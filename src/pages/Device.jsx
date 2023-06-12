import React, { useState } from "react";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import { REFS } from "../utils/constants";
import SingleDeviceDataContainer from "../components/SingleDeviceDataContainer";

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
      {device ? (
        <>
          <Row className="border-bottom align-items-center pb-2">
            <h3 className="m-0">
              {title}:
              <span className="fst-italic text-primary"> {device.name}</span>
            </h3>
          </Row>
          <SingleDeviceDataContainer device={device} userId={user.userId} />
        </>
      ) : (
        <div className="p-5 text-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Device;
