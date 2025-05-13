import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// RedirectIfLoggedIn component to redirect logged-in users away from login/signup pages
const RedirectIfLoggedIn = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/" /> : children;
};

export default RedirectIfLoggedIn;
