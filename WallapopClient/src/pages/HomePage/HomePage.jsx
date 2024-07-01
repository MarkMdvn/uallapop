import React from "react";
import NavBar from "../../components/common/NavBar/NavBar";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <h1 className="main-h1">this is the home page</h1>
      ;
      <ProductDetails />
    </>
  );
};

export default HomePage;
