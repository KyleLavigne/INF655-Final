import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// ProtectedRoute component to restrict access to certain routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a spinner/loading screen

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
