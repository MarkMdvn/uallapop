import React from "react";
import Navbar from "../common/NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default Layout;
