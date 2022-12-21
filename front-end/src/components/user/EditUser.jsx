import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditForm from "./EditForm";

function Edit() {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  return user && <EditForm user={user} id={id} />;
}

export default Edit;
