import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode"; // import dependency

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      return jwtDecode(token); // Initialize from local storage
    }
    return null;
  });

  const handleLogin = (token) => {
    const decodedUser = jwtDecode(token);
    localStorage.setItem("userId", decodedUser.sub);
    localStorage.setItem("userRole", decodedUser.roles);
    localStorage.setItem("userEmail", decodedUser.email);
    localStorage.setItem("token", token);
    setUser(decodedUser);
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, getAuthHeader }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
