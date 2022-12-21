import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../user/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

function Create() {
  const users = useSelector(selectAllUsers);
  const [userOptions, setUserOptions] = useState({});
  useEffect(() => {
    const options = users?.map((user) => {
      let obj = {};
      obj.label = user.username;
      obj.value = user.id;
      return obj;
    });
    setUserOptions(options);
  }, [users]);
  const content = users ? (
    <NewNoteForm users={userOptions} />
  ) : (
    <p>Loading...</p>
  );

  return content;
}

export default Create;
