// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import ProductSlider from "../../components/product/ProductSlider/ProductSlider";
import { getLatestProductsByCategory } from "../../api/productService"; //
import "./HomePage.css";
import HomeBanner from "../../components/banners/HomeBanner/HomeBanner";

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
