import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserProducts.css";
import { useAuth } from "../../auth/AuthProvider";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegHandshake } from "react-icons/fa6";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("ON_SELL");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user || !localStorage.token) {
        console.error("No user token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:9192/api/products/my-products",
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [user]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredProducts = products.filter(
    (product) => product.productStatus === activeTab
  );

  return (
    <div className="user-products-container">
      <h1 className="user-products-header">Your Products</h1>
      <h4 className="user-products-subheader">
        Here you can post a product, edit whatever you posted and promote it to
        sell it faster.
      </h4>
      <div className="tab-buttons">
        <button
          onClick={() => handleTabChange("ON_SELL")}
          className={`tab-button ${activeTab === "ON_SELL" ? "active" : ""}`}
        >
          On Sell
        </button>
        <button
          onClick={() => handleTabChange("SOLD")}
          className={`tab-button ${activeTab === "SOLD" ? "active" : ""}`}
        >
          Sold
        </button>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img
              src={product.imageUrls[0]}
              alt={product.title}
              className="product-image"
            />
            <div className="product-details">
              <h3 style={{ marginBottom: "10px" }}>{product.price} €</h3>
              <span>{product.title}</span>
            </div>
            <div className="product-details-dates">
              <p className="product-details-dates-ind">
                <span>Published</span>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p className="product-details-dates-ind">
                <span>Modified</span>
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="product-buttons">
              <button
                className="product-button"
                data-tooltip="Mark the item as sold"
              >
                <FaRegHandshake />
              </button>
              <button className="product-button" data-tooltip="Edit item">
                <MdOutlineModeEdit />
              </button>
              <button
                className="product-button"
                data-tooltip="Mark item as reserved"
              >
                R
              </button>
              <button className="product-button" data-tooltip="Delete item">
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
