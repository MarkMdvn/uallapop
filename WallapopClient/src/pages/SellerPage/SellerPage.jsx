import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userService";
import { getProductById } from "../../api/productService";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import "./SellerPage.css";
import BasicProductCard from "../../components/product/BasicProductCard/BasicProductCard";

const SellerPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Products"); // Default active tab

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        return response.data.productIds;
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData().then((productIds) => {
      if (productIds && productIds.length > 0) {
        Promise.all(productIds.map((id) => getProductById(id)))
          .then((responses) => setProducts(responses.map((res) => res.data)))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="seller-page">
      <div className="user-info-container">
        <div className="user-details">
          <img
            src={
              user.profileImg
                ? `data:image/jpeg;base64,${user.profileImg}`
                : "/user-default.png"
            }
            alt={`${user.name}'s profile`}
            className="user-avatar"
          />
          <div className="user-rating">
            <h4>{user.name}</h4>
            <Stack>
              <Rating
                name="half-rating-read"
                defaultValue={user.averageRating}
                precision={0.5}
                readOnly
              />
            </Stack>
            <span
              style={{ paddingLeft: "3px" }}
              className="seller-num-of-ratings"
            >
              (1) {/* Number of ratings placeholder */}
            </span>
          </div>
        </div>
        <div className="seller-information">
          <span>30 sales</span> {/* Placeholder data */}
          <span>6 buys</span>
          <span>11 sells</span>
          <span>[user-location]</span>
        </div>
      </div>
      <div className="seller-tab-buttons">
        <button
          onClick={() => setActiveTab("Products")}
          className={`tab-button ${activeTab === "Products" ? "active" : ""}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("Ratings")}
          className={`tab-button ${activeTab === "Ratings" ? "active" : ""}`}
        >
          Ratings
        </button>
      </div>
      {activeTab === "Products" && (
        <div className="items-for-sale-container">
          <div className="items-list">
            {products.map((product, index) => (
              <BasicProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
      {activeTab === "Ratings" && (
        <div className="seller-ratings">
          {/* Placeholder for seller ratings */}
          <p>No ratings available yet.</p>
        </div>
      )}
    </div>
  );
};

export default SellerPage;
