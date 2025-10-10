import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    // send them to login, keep where they tried to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
