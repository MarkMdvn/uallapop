// src/api.js
import axios from "axios";

const API_URL = "http://localhost:9192/api";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/all-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
