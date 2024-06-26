import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import ProductDetails from "../ProductDetails/ProductDetails";
import SellerInfo from "../SellerInfo/SellerInfo";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  if (!product || !product.imageUrls) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card-container">
      <SellerInfo />
      <ImageSlider imageUrls={product.imageUrls} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductCard;
