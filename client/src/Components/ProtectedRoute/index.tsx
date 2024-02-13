import React, { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  admin?: boolean;
  redirect?: string;
}


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
  adminOnly,
  admin,
  redirect = "/login",

}) => {

  if (!isAuthenticated) return <Navigate to={redirect} />;
  if (adminOnly && !admin) return <Navigate to={redirect} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
