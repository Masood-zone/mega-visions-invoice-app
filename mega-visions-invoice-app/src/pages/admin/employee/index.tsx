import React from "react";
import { Outlet } from "react-router-dom";

function EmployeeLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default EmployeeLayout;
