import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";
function Note({ noteId }) {
  const note = useSelector((state) => selectNoteById(state, noteId));
  const navigate = useNavigate();

  if (note) {
    const editHandle = () => navigate(`/dash/notes/${noteId}`);
    const cellStatus = note.active ? "" : "table__cell--inactive";
    return (
      <tr>
        <td className={`table__cell ${cellStatus}`}>
          {note.user.substr(1, 5)}
        </td>
        <td className={`table__cell ${cellStatus}`}>{note.title}</td>
        <td className={`table__cell ${cellStatus}`}>
          {note.description.substr(1, 15) + "..."}
        </td>
        <td className={`table__cell ${cellStatus}`}>
          <button onClick={editHandle}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default Note;
