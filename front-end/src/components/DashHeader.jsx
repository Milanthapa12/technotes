import { Link } from "react-router-dom";

function DashHeader() {
  return (
    <div>
      <Link to="/dash/notes">Technotes</Link>
      {/* here goes navigaion */}
    </div>
  );
}

export default DashHeader;
