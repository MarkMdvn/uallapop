// src/components/common/ProductSlider/ProductSlider.jsx

import React, { useState, useEffect } from "react";
import { getLatestProductsByCategory } from "../../../api/productService"; //
import Slider from "react-slick";
import BasicProductCard from "../../../components/product/BasicProductCard/BasicProductCard";
import "./ProductSlider.css";

const ProductSlider = ({ SliderTitle, categoryId }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCarProducts = async () => {
      try {
        const response = await getLatestProductsByCategory(categoryId);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error("Data received is not an array:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchCarProducts();
  }, [categoryId]);

  return (
    <div className="product-slider-container">
      <h2 className="product-slider-title">{SliderTitle}</h2>
      <Slider {...settings}>
        {Array.isArray(products) &&
          products.map((product) => (
            <BasicProductCard key={product.id} product={product} />
          ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
