// src/common/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // <-- FIXED (not ../../auth)
import Button from "./Button";

export default function LogoutButton({ children = "Logout", ...props }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <Button variant="outline" onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
