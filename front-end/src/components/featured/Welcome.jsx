import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

function Welcome() {
  const { username, isAdmin, isManager } = useAuth();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format();
  return (
    <Col>
      <Col md={{ span: 2, offset: 1 }} className="vh-100">
        <ListGroup className="rounded-0">
          <ListGroup.Item>
            <Link to="/dash/users">Users</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/dash/notes">Notes</Link>
          </ListGroup.Item>
        </ListGroup>
        <p>Walecom {username} !</p>
      </Col>
      {/* <Link to="/dash">Welcome</Link> TODAY: {today} */}
    </Col>
  );
}

export default Welcome;
