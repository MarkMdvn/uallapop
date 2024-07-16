import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLatestProductsByCategoryWP } from "../../api/productService";
import HorizontalProductCard from "../../components/product/HorizontalProductCard/HorizontalProductCard";
import "./ProductListPage.css";

const ProductListPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 7; // This is a constant configuration for the page size
  // TODO disabe strict mode it fetches the first array twice

  // Fetch products based on category ID, page, and size
  const fetchProducts = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLatestProductsByCategoryWP(
        categoryId,
        page,
        pageSize
      );
      setProducts((prevProducts) => [...prevProducts, ...response.content]); // Concatenate new products
      setCurrentPage(page); // Update the current page
    } catch (error) {
      console.error("Error fetching products", error);
      setError("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on category change or initial render
  useEffect(() => {
    setProducts([]);
    setCurrentPage(0);
    fetchProducts(0); // Fetch the first page
  }, [categoryId]);

  // Function to handle loading more products
  const loadMore = () => {
    fetchProducts(currentPage + 1);
  };

  // Render loading, error, or the product list
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
        <button onClick={loadMore} className="load-more-btn">
          Load More products
        </button>
      </div>
    </div>
  );
};

export default ProductListPage;
