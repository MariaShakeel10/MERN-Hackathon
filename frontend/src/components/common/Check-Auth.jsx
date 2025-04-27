import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log("Auth Check:", { isAuthenticated, user, pathname: location.pathname });
// changes made in this component.......................................................................................................................................................................
  if (!isAuthenticated) {
    // 🚀 Redirect unauthenticated users to login page
    if (!location.pathname.startsWith("/auth")) {
      return <Navigate to="/auth/login" replace />;
    }
  }
// ......................................................................................................................................................................................................
  if (isAuthenticated) {
    // 🚀 Redirect authenticated users to home page
    if (location.pathname.startsWith("/auth")) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
