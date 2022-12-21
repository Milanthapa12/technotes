import { useSelector } from "react-redux";
import { selectCurrentToken } from "../components/auth/authSlice";
import jwtDecodde from "jwt-decode";

function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecodde(token);
    const { username, roles, email } = decoded;
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    return { username, roles, isManager, isAdmin, status };
  }
  return { username: "", roles: [], isManager, isAdmin, status };
}

export default useAuth;
