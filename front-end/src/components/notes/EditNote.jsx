import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./noteApiSlice";
import { selectAllUsers } from "../user/usersApiSlice";
import EditNoteForm from "./EditNoteForm";

function EditNote() {
  const { id } = useParams();
  const users = useSelector(selectAllUsers);
  const note = useSelector((state) => selectNoteById(state, id));
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

  const content =
    note && users ? (
      <EditNoteForm note={note} users={userOptions} id={id} />
    ) : (
      <p>Loading...</p>
    );
  return content;
}

export default EditNote;
