import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

function User({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId));
  const navigate = useNavigate();

  if (user) {
    const editHandle = () => navigate(`/dash/users/${userId}`);
    const userRoleString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "table__cell--inactive";
    return (
      <tr>
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{user.email}</td>
        <td className={`table__cell ${cellStatus}`}>{userRoleString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button onClick={editHandle}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export default User;
