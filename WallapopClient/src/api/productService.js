// src/api.js
import axios from "axios";
import { useAuth } from "../components/auth/AuthProvider"; // Make sure the path is correct

import { getHeader } from "./authService";

const API_URL = "http://localhost:9192/api";

// Product by ID
export const getProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const sellProduct = (formData, headers) => {
  return axios.post(`${API_URL}/products/create-product`, formData, {
    headers,
  });
};

// Fetch latest products by category ID
export const getLatestProductsByCategory = (categoryId) => {
  return axios.get(`${API_URL}/products/latest-by-category/${categoryId}`);
};
