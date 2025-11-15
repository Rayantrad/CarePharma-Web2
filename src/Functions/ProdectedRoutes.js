import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import { Navigate, useLocation } from "react-router";

function ProtectedRoutes({ children, role }) {
  const { isAuth, user } = useContext(UserContext);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoutes;