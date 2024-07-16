import axios from "axios";
const API_URL = "http://localhost:9192/api/users";

export const getUserById = (userId) => {
  return axios.get(`${API_URL}/complete-user/${userId}`);
};
