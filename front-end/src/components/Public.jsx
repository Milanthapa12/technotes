import React from "react";
import { Col, Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function Public() {
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <Alert variant="success rounded-0 my-5">
          <Alert.Heading>
            Welcome to M&M Computer repair Pvt. Ltd.
          </Alert.Heading>
          <p>We repair all kind of Digital Devices and accessories.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Link to="login" className="btn btn-primary rounded-0 btn-sm">
              Login
            </Link>
          </div>
        </Alert>
      </Col>
    </Row>
  );
}

export default Public;
