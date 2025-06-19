import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublicOnlyRoute: React.FC = () => {
  const { userInfo } = useAuth();

  // If the user is logged in, redirect them away from the public-only page.
  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicOnlyRoute;
