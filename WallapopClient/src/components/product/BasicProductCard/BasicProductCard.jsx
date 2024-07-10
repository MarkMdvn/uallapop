import React, { useEffect, useState } from "react";
import "./BasicProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { checkLikedStatus } from "../../../api/productService";

const BasicProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedStatus = async () => {
      try {
        const response = await checkLikedStatus(product.id);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error("Error checking liked status", error);
      }
    };

    fetchLikedStatus();
  }, [product.id]);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

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
        <div className="price-and-like">
          <p className="basic-product-card-price">{product.price}</p>
          <span>{isLiked && <FaHeart className="liked-icon" />}</span>
        </div>
        <h4 className="basic-product-card-title">{product.title}</h4>
        {product.category === "OtherItems" && (
          <p>
            {product.shippingAvailable
              ? "Envío disponible"
              : "Envío no disponible"}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicProductCard;
