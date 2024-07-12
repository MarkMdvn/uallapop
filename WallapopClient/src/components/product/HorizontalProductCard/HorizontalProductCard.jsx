import React, { useEffect, useState } from "react";
import "./HorizontalProductCard.css";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { checkLikedStatus } from "../../../api/productService";
import { formatPrice } from "../../../utils/formatPrice";
import { truncateText } from "../../../utils/stringUtils";

const HorizontalProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedStatus = async () => {
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
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="horizontal-product-card-container"
      onClick={handleCardClick}
    >
      <div className="horizontal-product-image-container">
        <img
          className="horizontal-product-card-image"
          src={product.imageUrls[0]}
          alt={product.title}
        />
      </div>
      <div className="horizontal-product-card-details">
        <div className="price-and-like">
          <p className="horizontal-product-card-price">
            {formatPrice(product.price)} €
          </p>
          <span>{isLiked && <FaHeart className="liked-icon" />}</span>
        </div>
        <h4 className="horizontal-product-card-title">{product.title}</h4>
        <p className="horizontal-product-card-description">
          {truncateText(product.description, 500)}
        </p>
        <p className="horizontal-product-card-extra">{product.extraInfo}</p>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
