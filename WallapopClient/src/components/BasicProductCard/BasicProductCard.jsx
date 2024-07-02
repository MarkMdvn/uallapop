import React from "react";
import "./BasicProductCard.css";
import { useNavigate } from "react-router-dom";

const BasicProductCard = ({ product }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleCardClick = () => {
    navigate(`/products/${product.id}`); // Navigate to product detail page
  };

  return (
    <div className="basic-product-card-container" onClick={handleCardClick}>
      <div className="basic-product-image-container">
        <img
          className="basic-product-card-image"
          src={product.imageUrls[0]}
          alt={product.title}
        />
      </div>
      <div className="basic-product-card-details">
        <p className="basic-product-card-price">{product.price} €</p>
        <h4 className="basic-product-card-title">{product.title}</h4>
        <p>
          {product.shippingAvailable
            ? "Envío disponible"
            : "Envío no disponible"}
        </p>
      </div>
    </div>
  );
};

export default BasicProductCard;
