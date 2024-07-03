import React from "react";
import Navbar from "../common/NavBar/NavBar";
import Footer from "../common/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
