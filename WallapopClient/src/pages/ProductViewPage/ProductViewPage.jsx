import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductViewCard from "../../components/product/ProductView/ProductViewCard/ProductViewCard";
import { getProductById } from "../../api/productService";
import "./ProductViewPage.css";

const ProductViewPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

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
        <ProductViewCard product={product} />
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductViewPage;
