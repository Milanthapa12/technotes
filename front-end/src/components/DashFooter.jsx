import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function DashFooter() {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathnname } = useLocation();
  const onGoHome = () => navigate("/dash");
  let goHomeBtn = null;
  if (pathnname !== "/dash") {
    goHomeBtn = (
      <button className="btn btn-primary" title="Home" onClick={onGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return (
    // <div>
    //   DashFooter
    //   {goHomeBtn}
    //   <footer>
    //     <p>current user: </p>
    //     <p>status: </p>
    //   </footer>
    // </div>
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>DashFooter {goHomeBtn}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Logged in as: {username}</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashFooter;
