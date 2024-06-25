import React from "react";
import Navbar from "../common/NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout-content">{children}</div>
    </>
  );
};

export default Layout;
