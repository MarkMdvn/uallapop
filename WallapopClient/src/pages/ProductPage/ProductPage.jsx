import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/common/NavBar/NavBar"; // Assuming NavBar is at this location
import ProductCard from "../../components/product/ProductCard/ProductCard";
import { getProductById } from "../../api/productService"; // Adjust the path as necessary
import "./ProductPage.css";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL parameters

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="product-page-container">
      {product ? (
        <ProductCard product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductPage;
