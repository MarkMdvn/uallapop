import React from "react";
import Navbar from "../common/NavBar/NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
