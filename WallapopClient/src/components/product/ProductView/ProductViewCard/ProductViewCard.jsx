import React from "react";
import ImageSlider from "../ImageSlider/ImageSlider";
import OtherItemDetails from "../ProductDetails/OtherItemsDetails/OtherItemsDetails";
import CarDetails from "../ProductDetails/CarDetails/CarDetails";
import PropertyDetails from "../ProductDetails/PropertyDetails/PropertyDetails";
import JobDetails from "../ProductDetails/JobDetails/JobDetails";
import SellerInfo from "../SellerInfo/SellerInfo";
import "./ProductViewCard.css";
import ProductStatistics from "../ProductStatistics/ProductStatistics";
import SustainabilityBanner from "../ProductDetails/SustainabilityBanner/SustainabilityBanner";

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Loading...</div>;
  }

  // Function to decide which details component to render based on the category ID
  const renderDetailsComponent = (categoryId) => {
    switch (categoryId) {
      case 1:
        return <OtherItemDetails product={product} />;
      case 2:
        return <CarDetails product={product} />;
      case 3:
        return <PropertyDetails product={product} />;
      case 4:
        return <JobDetails product={product} />;
      default:
        return <OtherItemDetails product={product} />;
    }
  };

  return (
    <div className="product-card-container">
      <SellerInfo userId={product.userId} productId={product.id} />
      <ImageSlider imageUrls={product.imageUrls} />
      {renderDetailsComponent(product.categoryId)}
      <SustainabilityBanner />
      <hr className="custom-hr" style={{ margin: "10px 20px" }} />
      <ProductStatistics product={product} />
      <hr className="custom-hr" style={{ margin: "20px 20px" }} />
    </div>
  );
};

export default ProductCard;
