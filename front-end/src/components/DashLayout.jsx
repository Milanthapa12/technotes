import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

function DashLayout() {
  return (
    <>
      <DashHeader />
      <div className="">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
}

export default DashLayout;
