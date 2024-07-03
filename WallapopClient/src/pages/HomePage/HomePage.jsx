// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import ProductSlider from "../../components/product/ProductSlider/ProductSlider";
import { getLatestProductsByCategory } from "../../api/productService"; //
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCarProducts = async () => {
      try {
        const response = await getLatestProductsByCategory(2);
        console.log("API Response:", response.data); // Ensure this logs expected data
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Data received is not an array:", response.data);
          setProducts([]); // Ensure reset if data is incorrect
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set to empty on error
      }
    };

    fetchCarProducts();
  }, []);

  return (
    <div className="home-page-container">
      <ProductSlider SliderTitle={"Latest Car posts"} products={products} />
      <ProductSlider SliderTitle={"Latest Car posts"} products={products} />
      <ProductSlider SliderTitle={"Latest Car posts"} products={products} />
    </div>
  );
};

export default HomePage;
