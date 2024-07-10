import React, { useContext, useEffect, useState } from "react";
import { getUserById } from "../../../../api/userService";
import { AuthContext } from "../../../auth/AuthProvider";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./SellerInfo.css";
import { FiHeart } from "react-icons/fi";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  likeProduct,
  unlikeProduct,
  checkLikedStatus,
} from "../../../../api/productService";
import axios from "axios";

const SellerInfo = ({ userId, productId }) => {
  const [seller, setSeller] = useState(null);
  const [liked, setLiked] = useState();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUserById(userId)
        .then((response) => {
          setSeller(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch seller details:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      if (!user || !productId) {
        console.log("You have to log in first");
        return;
      }
      try {
        const response = await checkLikedStatus(productId);
        if (response.data.liked) {
          setLiked(true);
          console.log("This item is liked");
        } else {
          setLiked(false);
          console.log("This item is not liked");
        }
      } catch (error) {
        console.error("Failed to check like status:", error);
        setLiked(false);
      }
    };

    fetchLikedStatus();
  }, [productId, user]);
  const handleLikeClick = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      if (liked) {
        await unlikeProduct(productId, localStorage.token);
        setLiked(false);
        console.log("The user unliked the product!");
      } else {
        await likeProduct(productId, localStorage.token);
        setLiked(true);
        console.log("The user liked the product!");
      }
    } catch (error) {
      console.error("Failed to update like status:", error);
    }
  };

  if (!seller) {
    return <div>Loading seller info...</div>;
  }

  return (
    <div className="seller-info-container">
      <div className="seller-avatar-img">
        {" "}
        <img
          src={
            seller.profileImg
              ? `data:image/jpeg;base64,${seller.profileImg}`
              : "/user-default.png"
          }
          alt={`${seller.name}'s profile`}
        />
      </div>
      <div className="seller-details">
        <h4>{seller.name}</h4>
        <div className="seller-stats">
          <Stack>
            <Rating
              name="half-rating-read"
              defaultValue={seller.averageRating}
              precision={0.5}
              readOnly
            />
          </Stack>
          <span className="seller-avrg-rating">{seller.averageRating}</span>
          <span className="seller-num-of-ratings">(1)</span>
        </div>
      </div>
      <div className="seller-history">
        <div className="seller-total-sales">
          <BiSolidBarChartAlt2 />
          {seller.totalSales} sells
        </div>
        <div className="seller-total-ratings">1 ratings</div>
      </div>
      <div className="seller-actions">
        <button
          className={`seller-like-button ${liked ? "liked" : ""}`}
          onClick={handleLikeClick}
        >
          <FiHeart />
        </button>
        <button className="seller-chat-button">Chat</button>
      </div>
    </div>
  );
};

export default SellerInfo;
