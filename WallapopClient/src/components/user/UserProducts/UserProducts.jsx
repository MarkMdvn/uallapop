import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  handleUpdateStatus,
  handleDeleteProduct,
} from "../../../api/productService";
import "./UserProducts.css";
import { useAuth } from "../../auth/AuthProvider";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt, FaRegHandshake, FaRegBookmark } from "react-icons/fa";
import ConfirmActionModal from "../../modals/ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import EditProductForm from "../../product/EditProduct/EditProductForm";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("ON_SELL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [actionType, setActionType] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [editing, setEditing] = useState(false); // State to manage editing mode

  useEffect(() => {
    if (!user || !localStorage.getItem("token")) {
      console.error("No user token found");
      return;
    }
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9192/api/products/my-products",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [user]);

  const openModal = (product, action) => {
    setCurrentProduct(product);
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmAction = () => {
    switch (actionType) {
      case "delete":
        handleDeleteProduct(currentProduct.id);
        break;
      case "reserve":
        handleUpdateStatus(currentProduct.id, "RESERVED");
        break;
      case "sell":
        handleUpdateStatus(currentProduct.id, "SOLD");
        break;
      default:
        console.log("No action specified");
    }
    closeModal();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  const filteredProducts = products.filter(
    (product) => product.productStatus === activeTab
  );

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setEditing(true);
  };

  const closeEdit = () => {
    setEditing(false);
  };

  if (editing) {
    return <EditProductForm product={currentProduct} closeForm={closeEdit} />;
  }

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
              onClick={() => handleProductClick(product.id)}
            />
            <div className="product-details">
              <h3 style={{ marginBottom: "10px" }}>{product.price} €</h3>
              <span>{product.title}</span>
            </div>
            <div className="product-details-dates">
              <p
                onClick={() => handleProductClick(product.id)}
                className="product-details-dates-ind"
              >
                <span>Published</span>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p
                onClick={() => handleProductClick(product.id)}
                className="product-details-dates-ind"
              >
                <span>Modified</span>{" "}
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="product-buttons">
              <button
                onClick={() => openModal(product, "sell")}
                className="product-button"
                data-tooltip="Mark the item as sold"
              >
                <FaRegHandshake />
              </button>
              <button
                onClick={() => handleEditProduct(product)}
                className="product-button"
                data-tooltip="Edit item"
              >
                <MdOutlineModeEdit />
              </button>
              <button
                onClick={() => openModal(product, "reserve")}
                className="product-button"
                data-tooltip="Mark item as reserved"
              >
                <FaRegBookmark />
              </button>
              <button
                onClick={() => openModal(product, "delete")}
                className="product-button"
                data-tooltip="Delete item"
              >
                <FaRegTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && actionType === "edit" && currentProduct && (
        <EditProductForm product={currentProduct} />
      )}
      <ConfirmActionModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={confirmAction}
        product={currentProduct}
        actionType={actionType}
      />
    </div>
  );
};

export default UserProducts;
