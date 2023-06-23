import React, { useState } from "react";
import { loginUser, createUser } from "../firebase/auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, InputGroup, Row } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { registerSchema } from "../utils/yup";
import { REFS } from "../utils/constants";
import * as formik from "formik";
import Loading from "../components/common/Loading";

const Auth = () => {
  const [authMode, setAuthMode] = useState("signin");
  const isAuth = useSelector((state) => state.auth.isAuth);
  const loading = useSelector((state) => state.loading.auth);
  const [firstSubmit, isFirstSubmit] = useState(false);
  const { Formik } = formik;

  const handleSubmit = (data) => {
    const { username, email, password } = data;
    authMode === "signin"
      ? loginUser(email, password)
      : createUser(email, password, username);
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <Formik
      validationSchema={authMode === "signup" && registerSchema}
      onSubmit={(data) => handleSubmit(data)}
      validateOnChange={firstSubmit}
      initialValues={{
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        // terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <div className="auth-form-container">
          {!isAuth ? (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="auth-form mx-3 rounded py-4 bg-white"
            >
              <div className="px-4">
                <h3 className="auth-form-title mb-3">
                  {authMode === "signin" ? "Sign In" : "Sign Up"}
                </h3>
                <p className="text-center mb-3">
                  {authMode === "signin"
                    ? "Not registered yet? "
                    : " Already registered? "}
                  <span
                    className="link-primary"
                    onClick={changeAuthMode}
                    role="button"
                  >
                    {authMode === "signin" ? "Sign Up" : "Sign In"}
                  </span>
                </p>

                {authMode === "signup" && (
                  <Row className="mb-3">
                    <Form.Group md="4" controlId="validationFormikUsername">
                      <Form.Label>Username</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">
                          @
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          placeholder="Username"
                          aria-describedby="inputGroupPrepend"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                )}
                <Row className="mb-3">
                  <Form.Group md="4" controlId="validationFormikEmail">
                    <Form.Label>Email address</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <AiOutlineMail />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={authMode === "signup" && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {authMode === "signup" && `${errors.email}`}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group md="4" controlId="validationFormikPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text>
                        <RiLockPasswordLine />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        aria-describedby="inputGroupPrepend"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={authMode === "signup" && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {authMode === "signup" && `${errors.password}`}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                {authMode === "signup" && (
                  <Row className="mb-3">
                    <Form.Group md="4" controlId="validationFormikPassword">
                      <Form.Label>Repeate password</Form.Label>
                      <InputGroup hasValidation>
                        <InputGroup.Text>
                          <RiLockPasswordLine />
                        </InputGroup.Text>
                        <Form.Control
                          type="password"
                          placeholder="Repeate password"
                          aria-describedby="inputGroupPrepend"
                          name="passwordConfirmation"
                          value={values.passwordConfirmation}
                          onChange={handleChange}
                          isInvalid={
                            authMode === "signup" &&
                            !!errors.passwordConfirmation
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {authMode === "signup" &&
                            `${errors.passwordConfirmation}`}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>
                  </Row>
                )}
                {/* {authMode === "signup" && (
                  <Form.Group className="mb-3">
                    <Form.Check
                      required
                      name="terms"
                      label="Agree to terms and conditions"
                      onChange={handleChange}
                      isInvalid={!!errors.terms}
                      feedback={errors.terms}
                      feedbackType="invalid"
                      id="validationFormik0"
                    />
                  </Form.Group>
                )} */}
                <Button
                  type="submit"
                  onClick={() => isFirstSubmit(true)}
                  className="w-100 mt-3"
                >
                  {loading ? (
                    <Loading />
                  ) : authMode === "signin" ? (
                    "Login"
                  ) : (
                    "Registration"
                  )}
                </Button>
              </div>
            </Form>
          ) : (
            <Navigate to={`/${REFS.DEVICES}`} />
          )}
        </div>
      )}
    </Formik>
  );
};

export default Auth;
