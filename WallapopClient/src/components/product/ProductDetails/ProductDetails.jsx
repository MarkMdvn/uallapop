import React, { useState, useEffect } from "react";
import { getProductById } from "../../../api/productService";
import { LiaShippingFastSolid } from "react-icons/lia";

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
      <h6 style={{ padding: 20 }}>[Category-specific-details]</h6>
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
      <p style={{ padding: 20 }}>[product-hashtags]</p>
      <hr />
      <p className="product-details-product-description">
        {product.description}
      </p>
    </div>
  );
};

export default ProductDetails;
