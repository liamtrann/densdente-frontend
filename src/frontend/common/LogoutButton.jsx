// src/frontend/common/LogoutButton.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import Button from "./Button";

export default function LogoutButton({
  children = "Logout",
  variant = "ghost",
  ...rest
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout() {
    logout(); // clears auth
    navigate("/login", { replace: true, state: { from: location } });
  }

  return (
    <Button variant={variant} onClick={handleLogout} {...rest}>
      {children}
    </Button>
  );
}
