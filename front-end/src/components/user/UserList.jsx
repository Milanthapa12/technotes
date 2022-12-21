import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import { ModalContainer, MyTable } from "../FormHelpers";
import ModalForm from "./ModalForm";

const theads = ["Username", "Email", "Roles", "Action"];
function UserList() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery(
    undefined,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    console.log(error);
    content = (
      <p className={isError ? "errorCls" : ""}>{error?.data?.message}</p>
    );
  } else {
    const tableContent =
      data?.ids?.length > 0 ? (
        data?.ids.map((userId) => <User key={userId} userId={userId} />)
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            No users found !
          </td>
        </tr>
      );
    content = <MyTable theads={theads} body={tableContent} />;
  }

  return (
    <Col md={{ span: 8, offset: 2 }} className="vh-100">
      <Row justify-content-md-center>
        <div className="my-5">
          <div className="w-100 text-end mb-2">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              user
            </Button>
            <Button
              variant="success btn-sm rounded-0"
              title="Add User"
              onClick={() => navigate("/dash/users/new")}
            >
              <FontAwesomeIcon icon={faUserGroup} />
            </Button>
          </div>
          <div className="">{content}</div>
        </div>
      </Row>
      <ModalContainer
        show={modalShow}
        onHide={() => setModalShow(!modalShow)}
        id="user-create"
        buttonText="Create"
        btnCloseText="Cancel"
        title="Create User"
        body={<ModalForm setModalShow={setModalShow} />}
      />
    </Col>
  );
}

export default UserList;
