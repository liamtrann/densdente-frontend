// src/frontend/pages/auth/Login.jsx
import {
  AuthLayout,
  AuthCard,
  AuthField,
  AuthSubmit,
  AuthAltLink,
} from "../../common";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth(); // single hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    // TODO: real API auth
    login({ email });
    navigate(from, { replace: true });
  }

  return (
    <AuthLayout>
      <AuthCard title="Sign In" onSubmit={onSubmit}>
        <AuthField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 6 characters"
        />
        <AuthSubmit>Sign In</AuthSubmit>
        <AuthAltLink to="/signup">Create an account</AuthAltLink>
      </AuthCard>
    </AuthLayout>
  );
}
