import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      fetchUserDetails(decoded.sub, token);
    }
  }, []); // Removed user from dependencies to avoid initial reference error

  const fetchUserDetails = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:9192/api/users/by-email/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Fetched user details:", response.data);
      setUser({ ...jwtDecode(token), ...response.data });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
    fetchUserDetails(decodedUser.sub, token);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
