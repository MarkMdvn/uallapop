import React, { useEffect, useState } from "react";
import "./BasicProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaBookmark } from "react-icons/fa"; // Import the save icon
import { checkLikedStatus } from "../../../api/productService";
import { formatPrice } from "../../../utils/formatPrice";

const BasicProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedStatus = async () => {
      if (!localStorage.getItem("token")) return;
      try {
        const response = await checkLikedStatus(product.id);
        setIsLiked(response.data.liked);
      } catch (error) {
        console.error("Error checking liked status", error);
        return;
      }
    };

    fetchLikedStatus();
  }, [product.id]);

  const handleCardClick = () => {
    window.open(`/products/${product.id}`, "_blank");
  };

  return (
    <div className="basic-product-card-container" onClick={handleCardClick}>
      {product.productStatus === "RESERVED" && (
        <div className="save-icon-container">
          <FaBookmark className="save-icon" />
          Reserved
        </div>
      )}
      <div className="basic-product-image-container">
        <img
          className="basic-product-card-image"
          src={product.imageUrls[0]}
          alt={product.title}
        />
      </div>
      <div className="basic-product-card-details">
        <div className="price-and-like">
          <p className="basic-product-card-price">
            {formatPrice(product.price)} €
          </p>
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
