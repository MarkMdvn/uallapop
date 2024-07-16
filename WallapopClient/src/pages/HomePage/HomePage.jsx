// src/pages/HomePage.jsx
import React from "react";
import ProductSlider from "../../components/product/ProductSlider/ProductSlider";
import "./HomePage.css";

const HomePage = () => {
  const carsCategory = 2;
  const smartphonesCategory = 6;

  return (
    <div className="home-page-container">
      <ProductSlider
        SliderTitle={"Latest Car posts"}
        categoryId={carsCategory}
      />
      <ProductSlider
        SliderTitle={"Latest Phone posts"}
        categoryId={smartphonesCategory}
      />
    </div>
  );
};

export default HomePage;
