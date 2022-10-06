import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
function DashFooter() {
  const navigate = useNavigate();
  const { pathnname } = useLocation();
  const onGoHome = () => navigate("/dash");
  let goHomeBtn = null;
  if (pathnname !== "/dash") {
    goHomeBtn = (
      <button className="" title="Home" onClick={onGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return (
    <div>
      DashFooter
      {goHomeBtn}
      <footer>
        <p>current user: </p>
        <p>status: </p>
      </footer>
    </div>
  );
}

export default DashFooter;
