// src/api.js
import axios from "axios";

const API_URL = "http://localhost:9192/api";

// Product by ID
export const getProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

// Sell product
export const sellProduct = (formData) => {
  return axios.post(`${API_URL}/products/create-product`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Fetch latest products by category ID
export const getLatestProductsByCategory = (categoryId) => {
  return axios.get(`${API_URL}/products/latest-by-category/${categoryId}`);
};
