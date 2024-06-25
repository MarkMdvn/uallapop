import React from "react";
import NavBar from "../../components/common/NavBar/NavBar";
import ProductDetails from "../../components/product/ProductDetails/ProductDetails";

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
