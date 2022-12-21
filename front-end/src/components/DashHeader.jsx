import React, { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFrmBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../components/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

function DashHeader() {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isError, isSuccess, error }] =
    useSendLogoutMutation();
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  const logoutHandler = () => sendLogout();
  if (isLoading) {
    // console.log("Loading...");
  }
  if (isError) {
    console.log(error?.data?.message);
  }
  return (
    <Navbar bg="light" className="mb-3">
      <Container>
        <Link to="/dash">
          <Navbar.Brand>M&M Computer Research Center</Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Logged in as: {username}</Navbar.Text>
          <button className="btn btn-sm btn-dark mx-2" onClick={logoutHandler}>
            Logout
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashHeader;
