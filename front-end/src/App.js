import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Public from "./components/Public";
// import "./App.css";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import DashLayout from "./components/DashLayout";
import Register from "./components/auth/Register";
import Welcome from "./components/featured/Welcome";
import UserList from "./components/user/UserList";
import NoteList from "./components/notes/NoteList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="dash" element={<DashLayout />}>
            {/* protected routes here */}
            <Route index element={<Welcome />} />
            <Route path="users">
              <Route index element={<UserList />} />
            </Route>
            <Route path="notes">
              <Route index element={<NoteList />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
