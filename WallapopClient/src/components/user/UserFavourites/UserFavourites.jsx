import React, { useEffect, useState } from "react";
import {
  getProductById,
  getUserLikedProducts,
} from "../../../api/productService";
import BasicProductCard from "../../../components/product/BasicProductCard/BasicProductCard";
import "./UserFavourites.css";

const LikedItems = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Products");

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        const response = await getUserLikedProducts();
        setLikedProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch liked products", error);
      }
    };

    if (activeTab === "Products") {
      fetchLikedProducts();
    }
  }, [activeTab]);

  return (
    <div className="user-products-container">
      <h1 className="favourite-products-header">Your Favorites</h1>
      <h4 className="favourite-products-subheader">
        Here are your favourite items from wallapop
      </h4>
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab("Products")}
          className={`tab-button ${activeTab === "Products" ? "active" : ""}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab("Users")}
          className={`tab-button ${activeTab === "Users" ? "active" : ""}`}
        >
          Users
        </button>
      </div>
      <div className="items-list">
        {activeTab === "Products" &&
          likedProducts.map((product, index) => (
            <BasicProductCard product={product} key={index} />
          ))}
      </div>
    </div>
  );
};

export default LikedItems;
