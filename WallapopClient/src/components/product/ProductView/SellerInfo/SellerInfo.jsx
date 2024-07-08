import React, { useEffect, useState } from "react";
import { getUserById } from "../../../../api/userService";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./SellerInfo.css";
import { FiHeart } from "react-icons/fi";
import { BiSolidBarChartAlt2 } from "react-icons/bi";

const SellerInfo = ({ userId }) => {
  const [seller, setSeller] = useState(null);

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

  if (!seller) {
    return <div>Loading seller info...</div>; // Show loading until data is fetched
  }

  return (
    <div className="seller-info-container">
      <div className="seller-avatar-img">
        {" "}
        <img
          src={`data:image/jpeg;base64,${seller.profileImg}`}
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
        <button className="seller-like-button">
          <FiHeart />
        </button>
        <button className="seller-chat-button">Chat</button>
      </div>
    </div>
  );
};

export default SellerInfo;
