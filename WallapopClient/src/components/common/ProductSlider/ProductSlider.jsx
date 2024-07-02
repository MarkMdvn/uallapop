// src/components/common/ProductSlider/ProductSlider.jsx

import React from "react";
import Slider from "react-slick";
import BasicProductCard from "../../../components/BasicProductCard/BasicProductCard";
import "./ProductSlider.css";

const ProductSlider = ({ SliderTitle, products }) => {
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
