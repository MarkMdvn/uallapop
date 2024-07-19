// src/api.js
import axios from "axios";

const API_URL = "http://localhost:9192/api";

export const getProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const sellProduct = (formData, headers) => {
  return axios.post(`${API_URL}/products/create-product`, formData, {
    headers,
  });
};

export const updateProduct = (formData, productId, headers) => {
  return axios.put(`${API_URL}/products/edit-product/${productId}`, formData, {
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
  if (!localStorage.getItem("token")) {
    console.log("guest status");
  } else {
    return axios.get(`${API_BASE_URL}/likes/check-product/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
};

export const getUserLikedProducts = async () => {
  return axios.get(`${API_BASE_URL}/likes/products`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const getCountOfLikes = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/likes/product/${productId}/count`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch like count", error);
    return { count: 0 };
  }
};

export const getLatestProductsByCategoryWP = async (categoryId, page, size) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/latest-by-category-wp/${categoryId}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const fetchLatestProducts = async (page, size) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/latest-products?page=${page}&size=${size}`
    );
    return response.data; // This will return the actual data received from the server
  } catch (error) {
    console.error("Failed to fetch latest products:", error);
    return []; // Return an empty array on error to ensure the consuming function can handle it correctly
  }
};
