// src/frontend/auth/RequireAuth.jsx
export default function RequireAuth({ children }) {
  return children; // no guarding in no-auth mode
}

/* import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  const location = useLocation();
  if (!isAuthed)
    return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
 */
