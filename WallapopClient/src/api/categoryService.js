import axios from "axios";

const API_URL = "http://localhost:9192/api/categories";

export const getAllCategories = () => {
  return axios.get(`${API_URL}/all-categories`);
};
