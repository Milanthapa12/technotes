import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUserById, useDeleteUserMutation } from "./usersApiSlice";

function User({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();
  const [deleteNote, { isLoading, isError, isSuccess, error }] =
    useDeleteUserMutation();
  const deleteHandler = () => deleteNote({ id: userId });

  if (user) {
    const editHandler = () => navigate(`/dash/users/${userId}`);
    const userRoleString = user.roles.toString().replaceAll(",", ", ");

    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{userRoleString}</td>
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

export default User;
