import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getIsAdmin } from "../features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
