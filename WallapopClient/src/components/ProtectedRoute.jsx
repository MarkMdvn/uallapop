// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/authentication" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
