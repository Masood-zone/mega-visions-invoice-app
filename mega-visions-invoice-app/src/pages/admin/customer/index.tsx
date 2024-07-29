import React from "react";
import { Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default CustomerLayout;
