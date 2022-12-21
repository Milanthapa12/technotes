import React from "react";
import { Routes, Route } from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Public from "./components/Public";
// import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./components/featured/Welcome";
import UserList from "./components/user/UserList";
import EditUser from "./components/user/EditUser";
import CreateUser from "./components/user/CreateUser";
import NoteList from "./components/notes/NoteList";
import EditNote from "./components/notes/EditNote";
import CreateNote from "./components/notes/CreateNote";
import PreFetch from "./components/auth/PreFetch";
import PersistLogin from "./components/auth/PersistLogin";

import { ROLES } from "./components/config/roles";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
        {/* protected routes  */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<PreFetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manger]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UserList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<CreateUser />} />
                  </Route>
                </Route>
                <Route path="notes">
                  <Route index element={<NoteList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<CreateNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* end protected routes  */}
      </Route>
    </Routes>
  );
}

export default App;
