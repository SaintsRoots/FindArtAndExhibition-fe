import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated, getIsAdmin, getIsArtist } from "../features/auth/authSlice";

const ProtectedRoute = ({ children, role }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAdmin = useSelector(getIsAdmin);
  const isArtist = useSelector(getIsArtist);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role === 'Admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (role === 'Artist' && !isArtist) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
