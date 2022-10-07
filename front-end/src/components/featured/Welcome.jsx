import { Link } from "react-router-dom";

function Welcome() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  return (
    <div>
      <Link to="/dash">Welcome</Link> TODAY: {today}
      <br />
      <Link to="/dash/users">Users</Link>
      <br />
      <Link to="/dash/notes">Notes</Link>
    </div>
  );
}

export default Welcome;
