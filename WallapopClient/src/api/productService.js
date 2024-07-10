// src/api.js
import axios from "axios";
import { useAuth } from "../components/auth/AuthProvider";

import { getHeader } from "./authService";

const API_URL = "http://localhost:9192/api";

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

export const handleUpdateStatus = async (productId, newStatus) => {
  try {
    const response = await axios.put(
      `http://localhost:9192/api/products/${productId}/status`,
      {
        productStatus: newStatus,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
    );
    console.log("Status updated:", response.data);
  } catch (error) {
    console.error("Failed to update product status", error);
  }
};

export const handleDeleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:9192/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Failed to delete product", error);
  }
};

// Like functions

const API_BASE_URL = "http://localhost:9192/api"; // Adjust according to your actual API URL

export const likeProduct = async (productId) => {
  return axios.post(
    `${API_BASE_URL}/likes/product/${productId}`,
    {},
    {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }
  );
};

export const unlikeProduct = async (productId) => {
  return axios.delete(`${API_BASE_URL}/likes/product/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
  });
};

export const checkLikedStatus = async (productId) => {
  return axios.get(`${API_BASE_URL}/likes/check-product/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getUserLikedProducts = async () => {
  return axios.get(`${API_BASE_URL}/likes/products`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
