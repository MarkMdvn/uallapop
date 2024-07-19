import React, { useEffect, useState } from "react";
import BasicProductCard from "../BasicProductCard/BasicProductCard";
import { fetchLatestProducts } from "../../../api/productService"; // Correctly import your fetch function

const ProductsGrid = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchLatestProducts(0, 25);
      setProducts(data.content || []);
    };

    loadProducts();
  }, []);

  return (
    <>
      <h1>Recently posted</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "10px",
          marginTop: "20px",
          gridAutoRows: "minmax(50px, auto)",
          maxWidth: "100%", // Limiting width to 100% of its grid cell
        }}
      >
        {products.map((product) => (
          <BasicProductCard key={product.id} product={product} />
        ))}
      </div>
      <button className="load-more-btn">Load More products</button>
    </>
  );
};

export default ProductsGrid;
