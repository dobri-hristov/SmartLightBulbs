import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { DEVICE_LIFETIME } from "../utils/constants";
import { addDevice } from "../firebase/addDevice";
import { getAllDevicesOnce } from "../firebase/getDevices";
import { filterGroups, checkDeviceExist } from "../utils/devices";
import { addDeviceSchema } from "../utils/yup";
import * as formik from "formik";
import { createExistingDeviceToast } from "../utils/toasts";

const AddDeviceForm = ({ userId, setShowModal }) => {
  const { Formik } = formik;
  const [allGroups, setAllGroups] = useState([]);
  const [firstSubmit, isFirstSubmit] = useState(false);

  useEffect(() => {
    getAllDevicesOnce(userId).then((devices) =>
      setAllGroups(filterGroups(devices))
    );
  }, []);

  const handleAddDevice = (data) => {
    addDevice(`${userId}`, {
      ...data,
    });
    setShowModal(false);
  };

  return (
    <Formik
      validationSchema={addDeviceSchema}
      validateOnChange={firstSubmit}
      onSubmit={(data) => {
        const name = data.name.trim();
        const group = data.group.trim();
        getAllDevicesOnce(userId).then((devices) =>
          checkDeviceExist(devices, name, group)
            ? createExistingDeviceToast(name, group)
            : handleAddDevice(data)
        );
      }}
      initialValues={{
        name: "",
        group: "",
        hours: "" || 20000,
        watts: "" || 8,
        lumens: "" || 806,
        temperature: "" || 4000,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <div>
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group md="4" controlId="validationFormikUName">
                <Form.Label>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Enter device name"
                    name="name"
                    maxLength="40"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Label>Group</Form.Label>
              <Form.Group
                as={Col}
                xs={12}
                lg={7}
                controlId="validationFormik03"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter group"
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                  isInvalid={!!errors.group}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.group}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                xs={12}
                lg={5}
                controlId="validationFormik03"
              >
                <Form.Select
                  name="group"
                  value={values.group}
                  onChange={handleChange}
                  isInvalid={!!errors.group}
                >
                  <option
                    value={values.group}
                    disabled
                    label={values.group || "Groups"}
                  ></option>
                  {allGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Hours life</Form.Label>
                <Form.Select
                  name="hours"
                  value={values.hours}
                  onChange={handleChange}
                  isInvalid={!!errors.hours}
                >
                  <option
                    value={values.hours}
                    disabled
                    label={values.hours}
                  ></option>
                  {DEVICE_LIFETIME.map((hours) => (
                    <option key={hours} value={hours}>
                      {hours}
                    </option>
                  ))}
                </Form.Select>

                <Form.Text className="text-muted">
                  {values.hours === 20000 && "Default - 20 000 h"}
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.hours}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Watts</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  max={40}
                  name="watts"
                  value={values.watts}
                  onChange={handleChange}
                  isInvalid={!!errors.watts}
                />
                <Form.Text className="text-muted">
                  {values.watts === 8 && "Default - 8 W"}
                </Form.Text>

                <Form.Control.Feedback type="invalid">
                  {errors.watts}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationFormik03">
                <Form.Label>Lumens</Form.Label>
                <Form.Control
                  type="number"
                  min={100}
                  max={1600}
                  name="lumens"
                  value={values.lumens}
                  onChange={handleChange}
                  isInvalid={!!errors.lumens}
                />
                <Form.Text className="text-muted">
                  {values.lumens === 806 && "Default - 806 LM"}
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.lumens}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>Choose color temperature (K)</Form.Label>
              <Form.Control
                type="range"
                name="temperature"
                min="1000"
                max="10000"
                value={values.temperature}
                onChange={handleChange}
                className="range-input range"
              />
            </Form.Group>
            <div className="mb-3 d-flex justify-content-between">
              <span>warm</span>
              <span>{values.temperature || 5500} K</span>
              <span>cold</span>
            </div>
            <Row className="w-25 mx-auto">
              <Button
                variant="primary"
                onClick={() => isFirstSubmit(true)}
                type="submit"
              >
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddDeviceForm;
