import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Button, Form, Card } from "react-bootstrap";
import { InputForm, FormCheckBox } from "../FormHelpers";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import usePersist from "../../hooks/usePersist";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist();

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const inputChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login(formData);

      dispatch(setCredentials(data));
      setFormData({
        username: "",
        password: "",
      });
      navigate("/dash");
    } catch (err) {
      // if (isError) {
      // setErrors(error.data.message);
      // }
      console.log(err, "error");
    }
  };
  const handleToggle = () => setPersist((prev) => !prev);

  // console.log(errors, "milan");
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }} className="my-5 pb-3 shadow">
        <p>{errors}</p>
        {/* <Card>
          <Card.Header>Happy</Card.Header>
          <Card.Body>
            <Card.Title>Login</Card.Title>
          </Card.Body>
        </Card> */}
        <Form onSubmit={submitHandler}>
          <h3>Login</h3>
          <InputForm
            type="text"
            name="username"
            label="Username"
            classProperties=""
            value={formData.username}
            handleChange={inputChangeHandler}
          />
          <InputForm
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            handleChange={inputChangeHandler}
          />
          <FormCheckBox
            label="Trust This Device"
            name="remember_me"
            checked={persist}
            handleChange={handleToggle}
          />
          <div className="d-grid gap-2">
            <Button variant="primary btn-sm rounded-0" type="submit">
              Login
            </Button>
            <div className="text-center">
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
