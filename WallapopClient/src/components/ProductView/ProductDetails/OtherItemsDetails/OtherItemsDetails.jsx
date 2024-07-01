import React, { useState, useEffect } from "react";
import { getProductById } from "../../../../api/productService";
import { LiaShippingFastSolid } from "react-icons/lia";
import "./OtherItemsDetails.css";

const ProductDetails = ({ product }) => {
  const attributes = product.attributes;

  if (!product) {
    return <div>Loading...</div>;
  }

  const formatAttributes = (attributes) => {
    const entries = Object.entries(attributes);
    return entries.map(([key, value]) => `${value}`).join(" · ");
  };

  return (
    <div className="product-details-container">
      <div className="product-details-product-price">
        {product.price.toFixed(0)} €
      </div>
      <h1 className="product-details-product-title">{product.title}</h1>
      <div className="product-category-specific-details">
        {attributes ? formatAttributes(attributes) : "No details available"}
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
