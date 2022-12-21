import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import { selectNoteById, useDeleteNoteMutation } from "./noteApiSlice";

function Note({ users, noteId }) {
  const navigate = useNavigate();
  const note = useSelector((state) => selectNoteById(state, noteId));
  const [deleteNote, { isLoading, isError, isSuccess, error }] =
    useDeleteNoteMutation();

  if (note) {
    const editHandler = () => navigate(`/dash/notes/${noteId}`);
    const deleteHandler = () => deleteNote({ id: noteId });
    const employee = users.find((user) => user._id === note.user);
    const status = note.completed === true ? "completed" : "progress";

    return (
      <tr>
        <td>{note.ticket}</td>
        <td>{note.title}</td>
        <td>{note.description.substr(1, 20) + "..."}</td>
        <td>
          {
            <Badge pill bg={status === "completed" ? "success" : "primary"}>
              {status}
            </Badge>
          }
        </td>
        <td>{employee?.username}</td>
        <td>
          <Button variant="primary btn-sm mx-1" onClick={editHandler}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
          <Button variant="danger btn-sm mx-1" onClick={deleteHandler}>
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </td>
      </tr>
    );
  } else return null;
}

export default Note;
