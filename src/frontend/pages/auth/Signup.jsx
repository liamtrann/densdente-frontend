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
export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    // TODO: create account via backend
    login({ email }); // auto-login
    navigate("/admin", { replace: true });
  }

  return (
    <AuthLayout>
      <AuthCard title="Create Account" onSubmit={onSubmit}>
        <AuthField label="Full name" name="name" placeholder="Your name" />
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
        <AuthSubmit>Sign Up</AuthSubmit>
        <AuthAltLink to="/login">Already have an account? Sign in</AuthAltLink>
      </AuthCard>
    </AuthLayout>
  );
}
