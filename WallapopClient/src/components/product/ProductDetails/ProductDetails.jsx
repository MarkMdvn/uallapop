import React, { useState, useEffect } from "react";
import { getProductById } from "../../../api/productService";
import { LiaShippingFastSolid } from "react-icons/lia";
import "./ProductDetails.css";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(9); // Assuming 9 is the product ID you want to fetch
      setProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Add a loading or fallback state while data is being fetched
  }

  return (
    <div className="product-details-container">
      <div className="product-details-product-price">
        {product.price.toFixed(0)} €
      </div>
      <h1 className="product-details-product-title">{product.title}</h1>
      <div className="product-category-specific-details">
        Apple · iPhone 11 · 64 GB · Negro · Como nuevo
        [category-specific-details]
      </div>

      <div
        className={`product-details-shipping-status ${
          product.shippingAvailable
            ? "shipping-available"
            : "shipping-unavailable"
        }`}
      >
        {product.shippingAvailable ? (
          <>
            <LiaShippingFastSolid />
            <span>Shipping available</span>
          </>
        ) : (
          <span>Only sale in person</span>
        )}
      </div>
      <div className="product-details-product-categories">
        <div className="product-details-product-single-category">
          <span>{product.categoryName}</span>
        </div>
        <div className="product-details-product-single-category">
          <span>{product.categoryName}</span>
        </div>
        <div className="product-details-product-single-category">
          <span>{product.categoryName}</span>
        </div>
      </div>
      <hr className="custom-hr" />
      <p className="product-details-product-description">
        {product.description}
      </p>
      <div>[user-tags]</div>
      <hr className="custom-hr" />
    </div>
  );
};

export default ProductDetails;
