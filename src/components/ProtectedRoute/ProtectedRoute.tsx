import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStorage } from "../../services/authStorage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();

  if (!authStorage.isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
}
