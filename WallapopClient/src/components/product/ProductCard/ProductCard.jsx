import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import ProductDetails from "../ProductDetails/ProductDetails";
import SellerInfo from "../SellerInfo/SellerInfo";

const ProductCard = ({ product }) => {
  if (!product || !product.imageUrls) {
    // Ensure product and imageUrls are available
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card-container">
      <SellerInfo />
      <ImageSlider images={product.imageUrls} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductCard;
