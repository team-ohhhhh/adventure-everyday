import React from "react";
import { Outlet } from "react-router";

import NavBar from "./components/NavBar";

const Navigate = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default Navigate;
