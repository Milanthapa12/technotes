import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import Note from "./Note";
import { useSelector } from "react-redux";
import { useGetNotesQuery } from "./noteApiSlice";
import { selectAllUsers } from "../user/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import { MyTable } from "../FormHelpers";

const theads = [
  "Ticket",
  "Title",
  "Description",
  "Status",
  "Assigned To",
  "Action",
];
function NoteList() {
  const navigate = useNavigate();
  const { username, isManager, isAdmin } = useAuth();
  const users = useSelector(selectAllUsers);
  const { data, isLoading, isSuccess, isError, error } = useGetNotesQuery();
  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isError) {
    content = (
      <p className={isError ? "errorCls" : ""}>{error?.data?.message}</p>
    );
  }
  if (isSuccess) {
    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...data.ids];
    } else {
      filteredIds = data.ids.map(
        (id) => data.entities[id].username === username
      );
    }
    const tableContent =
      data?.ids?.length > 0 ? (
        filteredIds.map((noteId) => (
          <Note key={noteId} noteId={noteId} users={users} />
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center">
            No Notes found !
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
            <Button
              variant="primary btn-sm rounded-0"
              title="Add New Note"
              onClick={() => navigate("/dash/notes/new")}
            >
              <FontAwesomeIcon icon={faFile} />
            </Button>
          </div>
          <div className="">{content}</div>
        </div>
      </Row>
    </Col>
  );
}

export default NoteList;
