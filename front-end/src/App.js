import { Routes, Route } from "react-router-dom";
import Public from "./components/Public";
// import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import DashLayout from "./components/DashLayout";
import Register from "./components/auth/Register";
import Welcome from "./components/featured/Welcome";
import UserList from "./components/user/UserList";
import EditUser from "./components/user/EditUser";
import CreateUser from "./components/user/CreateUser";
import NoteList from "./components/notes/NoteList";
import EditNote from "./components/notes/EditNote";
import CreateNote from "./components/notes/CreateNote";
import PreFetch from "./components/auth/PreFetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PreFetch />}>
          <Route path="dash" element={<DashLayout />}>
            {/* protected routes here */}
            <Route index element={<Welcome />} />
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<CreateUser />} />
            </Route>
            <Route path="notes">
              <Route index element={<NoteList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<CreateNote />} />
            </Route>
          </Route>
          {/* end protected route here */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
