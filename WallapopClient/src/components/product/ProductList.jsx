// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api.js";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Description:</strong> {product.description}
            </p>
            <p>
              <strong>Shipping Available:</strong>{" "}
              {product.shippingAvailable ? "Yes" : "No"}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {product.categories.map((category) => category.name).join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
