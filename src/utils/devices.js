import { Button, Badge } from "react-bootstrap";
import { BsLightbulb, BsLightbulbOff } from "react-icons/bs";
import { formatNumber } from "./common";
import { updateDevice } from "../firebase/updateDevice";
import TimerContainer from "../components/TimerContainer";
import { setDefaultColumn } from "./bootstrap-table";
import {
  DeleteButton,
  DetailsButton,
  TimeLeftButton,
} from "../components/common/Buttons";
import { DEVICE_STATES, TIMELEFT_STATUS } from "./constants";
import TimeLeftStatus from "../components/TimeLeftStatus";

export const generateDevicesData = (devices, group) => {
  return (
    devices
      .filter((d) => (group ? d.group === group : d))
      .map((device) => ({
        ...device,
        uniqueKey: `${device.name}-${device.group}-${Math.random()}`,
      })) || []
  );
};

export const filterDevicesByGroup = (devices, group) => {
  return devices.filter((d) => (group ? d.group === group : d));
};

export const checkDeviceExist = (data, name, group) => {
  const devices = Object.values(data).filter(
    (d) => d.group === group && d.name === name
  );
  return devices.length > 0 ? devices : false;
};

export const filterGroups = (data) => {
  const groups = Object.values(data).map((res) => res.group);
  return groups.filter((val, i) => groups.indexOf(val) === i);
};

export const filterDevicesByState = (device, state) => {
  return state === DEVICE_STATES.ON
    ? device.state && device
    : state === DEVICE_STATES.OFF
    ? device.state === false && device
    : device;
};

export const gettimeLeftStatus = (currentHours, initialHours) => {
  return initialHours - initialHours / 10 <= currentHours
    ? TIMELEFT_STATUS.PERFECT
    : initialHours - initialHours / 4 <= currentHours
    ? TIMELEFT_STATUS.EXCELENT
    : initialHours - initialHours / 4 >= currentHours &&
      initialHours / 2 <= currentHours
    ? TIMELEFT_STATUS.GOOD
    : initialHours / 2 > currentHours && initialHours / 4 <= currentHours
    ? TIMELEFT_STATUS.WARNING
    : TIMELEFT_STATUS.DANGER;
};

export const mergeDevicesData = (devices) => {
  return devices.map((device) => ({
    ...device,
    uniqueKey: `${device.name}-${device.group}-${Math.random()}`,
  }));
};

const formatTemperature = (value) => {
  return (
    <Badge className="range-input text-black">{formatNumber(value)} K</Badge>
  );
};

const formatTimeLeft = (row) => {
  return (
    <TimeLeftStatus currentHours={row.hours} initialHours={row.initialHours} />
  );
};
const formatHours = (row) => {
  return (
    <TimeLeftButton currentHours={row.hours} initialHours={row.initialHours} />
  );
};

const formatHoursOn = (row) => {
  const { state, timeOn } = row;
  return (
    <>
      {state && typeof timeOn !== "undefined" ? (
        <TimerContainer state={state} timeOn={timeOn} />
      ) : (
        <Badge bg={`${state ? "primary" : "secondary"}`}>{"00:00:00"}</Badge>
      )}
    </>
  );
};

const deleteFormater = (setShowDeleteModal, row, setDeviceName) => {
  const { name, group } = row;
  const handleClick = () => {
    setDeviceName(`${name}_${group}`);
    setShowDeleteModal(true);
  };
  return <DeleteButton click={() => handleClick()} />;
};

const detailsFormater = (row) => {
  const { name, group } = row;
  return <DetailsButton path={`${name}_${group}`} />;
};

const stateFormater = (userId, device) => {
  const state = device.state;
  return (
    <Button
      variant={state ? "primary" : "outline-primary"}
      className={`${state && "blue-shadow"}  rounded-pill`}
      onClick={() => updateDevice(userId, device)}
    >
      {state ? <BsLightbulb size={15} /> : <BsLightbulbOff size={15} />}
    </Button>
  );
};

const centerColumn = { textAlign: "center" };
const boldCoolumn = { fontWeight: "bold", fontStyle: "italic" };
const columnXs = { width: "5%" };
const columnS = { width: "10%" };

export const generateColumns = (
  title,
  setShowDeleteModal,
  setDeviceName,
  userId
) => {
  return [
    {
      dataField: "id",
      text: "#",
      formatter: (cell, row, rowIndex) => {
        return rowIndex + 1;
      },
      headerStyle: {
        ...columnXs,
      },
      style: {
        ...boldCoolumn,
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      style: {
        ...boldCoolumn,
      },
    },
    {
      dataField: "group",
      text: "Group",
      sort: true,
      style: {
        ...boldCoolumn,
      },
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      formatter: (cell, row) => {
        return stateFormater(userId, row);
      },
      headerStyle: {
        ...columnS,
      },
    },
    {
      dataField: "timeOn",
      text: "Hours ON",
      formatter: (cell, row) => {
        return formatHoursOn(row);
      },
    },
    {
      dataField: "temperature",
      text: "Temperature",
      formatter: formatTemperature,
      sort: true,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "hours",
      text: "Timeleft status",
      formatter: (cell, row) => {
        return formatTimeLeft(row);
      },
      sort: true,
      headerStyle: {
        ...centerColumn,
      },
      style: {
        ...centerColumn,
      },
    },
    {
      dataField: "details",
      text: "",
      formatter: (cell, row) => {
        return detailsFormater(row);
      },
      headerStyle: {
        ...columnXs,
      },
    },
    {
      dataField: "timeleft",
      text: "",
      formatter: (cell, row) => {
        return formatHours(row);
      },
      headerStyle: {
        ...columnXs,
      },
    },
    {
      dataField: "delete",
      text: "",
      formatter: (cell, row) => {
        return deleteFormater(setShowDeleteModal, row, setDeviceName);
      },
      headerStyle: {
        ...columnXs,
      },
    },
  ].map((column) => ({
    ...column,
    onSort: (field, order) => {
      const selectedColumn = { field, order };
      setDefaultColumn(title, selectedColumn);
    },
  }));
};
