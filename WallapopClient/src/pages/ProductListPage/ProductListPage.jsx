import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestProductsByCategory } from "../../api/productService";
import HorizontalProductCard from "../../components/product/HorizontalProductCard/HorizontalProductCard";
import "./ProductListPage.css";

const ProductListPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getLatestProductsByCategory(categoryId);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="product-list-page">
      <div className="product-list-page product-list-page-container">
        <div className="product-list">
          {products.map((product) => (
            <HorizontalProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
