import { store } from "../../app/store";
import { notesApiSlice } from "../notes/noteApiSlice";
import { usersApiSlice } from "../user/usersApiSlice";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

function PreFetch() {
  useEffect(() => {
    console.log("subscribint");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}

export default PreFetch;
