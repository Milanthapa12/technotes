import { faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

function UserList() {
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
    content = (
      <p className={isError ? "errorCls" : ""}>{error?.data?.message}</p>
    );
  }
  const tableContent =
    data?.ids?.length > 0
      ? data?.ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
  content = (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{tableContent}</tbody>
    </table>
  );
  return content;
}

export default UserList;
