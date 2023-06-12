import React from "react";
import {
  Row,
  Col,
  Dropdown,
  ButtonGroup,
  DropdownButton,
  Form,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { DEFAULT_NAMES, DEVICE_STATES } from "../utils/constants";
import { AiOutlineUnorderedList, AiOutlineTable } from "react-icons/ai";
import { filterDevicesByGroup } from "../utils/devices";
import { getUserDefaultView, setUserDefaulSelections } from "../utils/user";

const FilterDevicesRow = ({
  devices,
  group,
  selectedState,
  setGroup,
  view,
  setView,
  setSelectedState,
  allGroups,
}) => {
  const handleGroup = (gruopName) => {
    setUserDefaulSelections(DEFAULT_NAMES.GROUP, gruopName);
    setGroup(gruopName);
  };

  const handleViewList = () => {
    setUserDefaulSelections(DEFAULT_NAMES.VIEW, DEFAULT_NAMES.LIST);
    setView(getUserDefaultView(DEFAULT_NAMES.VIEW));
  };

  const handleViewColumn = (e) => {
    setUserDefaulSelections(DEFAULT_NAMES.VIEW, DEFAULT_NAMES.COLUMNS);
    setView(getUserDefaultView(DEFAULT_NAMES.VIEW));
  };

  const handleChangeState = (e) => {
    setUserDefaulSelections(DEFAULT_NAMES.STATE, e.target.value);
    setSelectedState(e.target.value);
  };

  return (
    <Row className="mt-2 align-items-center px-1">
      <Col className="text-start d-flex px-2">
        <h5>
          Group:
          <span className="fst-italic">
            {group ? ` ${group} / ` : ` All groups / `}
            <strong
              className={`text-${
                selectedState === "ON"
                  ? "success"
                  : selectedState === "OFF"
                  ? "danger"
                  : "secondary"
              }`}
            >
              {selectedState}
            </strong>{" "}
              devices
          </span>
        </h5>
        <Badge className="align-self-baseline mx-1 rounded-pill" bg="primary">
          {devices
            ? filterDevicesByGroup(devices, group).length
            : devices.length}
        </Badge>
      </Col>
      <Col className="px-2">
        <InputGroup className="justify-content-end">
          <InputGroup.Text className="mb-1">
            <AiOutlineTable
              onClick={(e) => handleViewColumn(e)}
              size={26}
              cursor="pointer"
              className={`list-icons mx-2 text-${
                view === "columns" && "primary"
              }`}
            />
            <AiOutlineUnorderedList
              onClick={() => handleViewList()}
              cursor="pointer"
              className={`list-icons text-${view === "list" && "primary"}`}
              size={21}
            />
          </InputGroup.Text>
          <InputGroup.Text className="mb-1">
            <div className="d-flex">
              {Object.values(DEVICE_STATES).map((deviceState, i) => (
                <Form.Check
                  key={deviceState}
                  checked={deviceState === selectedState}
                  inline
                  label={deviceState}
                  type="radio"
                  value={deviceState}
                  onChange={(e) => handleChangeState(e)}
                />
              ))}
            </div>
          </InputGroup.Text>
          <InputGroup.Text className="mb-1">
            <Form className="m-1">
              <div className="d-flex">
                <span className="">All</span>
                <Form.Check
                  type="switch"
                  id="toggle-switch"
                  checked={!group}
                  disabled={!group}
                  onChange={() =>
                    setGroup(
                      setUserDefaulSelections(DEFAULT_NAMES.GROUP, false)
                    )
                  }
                />
              </div>
            </Form>
            <DropdownButton
              as={ButtonGroup}
              className="m-2"
              size="sm"
              variant="secondary"
              title={group || "All Groups"}
            >
              {allGroups.map((group, i) => (
                <Dropdown.Item
                  key={i}
                  value={group}
                  eventKey={group}
                  onClick={(e) => handleGroup(group)}
                >
                  {group}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup.Text>
        </InputGroup>
      </Col>
    </Row>
  );
};

export default FilterDevicesRow;
