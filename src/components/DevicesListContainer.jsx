import React, { useState } from "react";
import { Card } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { defaultSettings, getDefaultColumn } from "../utils/bootstrap-table";
import { generateColumns } from "../utils/devices";
import CustomModal from "./CustomModal";
import deleteDevice from "../firebase/deleteDevice";
import { generateDevicesData } from "../utils/devices";
import { DEFAULT_NAMES } from "../utils/constants";

const DevicesListContainer = ({ devices, group, userId }) => {
  const defaultColumn = getDefaultColumn(DEFAULT_NAMES.TABLE);
  const [showModal, setShowDeleteModal] = useState(false);
  const [deviceName, setDeviceName] = useState();

  const handleDelete = () => {
    deleteDevice(`${userId}`, deviceName);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Card className="card-outline" border="primary">
        <Card.Body>
          <BootstrapTable
            {...defaultSettings}
            keyField="uniqueKey"
            data={generateDevicesData(devices, group)}
            columns={generateColumns(
              DEFAULT_NAMES.TABLE,
              setShowDeleteModal,
              setDeviceName,
              userId
            )}
            rowStyle={{ fontSize: '1rem' }}
            sort={{
              dataField: defaultColumn?.field || "population",
              order: defaultColumn?.order || "desc",
            }}
          />
        </Card.Body>
      </Card>
      <CustomModal
        title="Delete Device"
        show={showModal}
        confirm={handleDelete}
        hide={() => setShowDeleteModal(false)}
      >
        Are you sure you want to delete{" "}
        <strong className="text-danger">{deviceName}</strong> ?
      </CustomModal>
    </div>
  );
};

export default DevicesListContainer;
