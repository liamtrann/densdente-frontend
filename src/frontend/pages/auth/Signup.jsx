// src/frontend/pages/auth/Signup.jsx
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

import AuthLayout from "../../common/AuthLayout";
import AuthCard from "../../common/AuthCard";
import AuthField from "../../common/AuthField";
import AuthSubmit from "../../common/AuthSubmit";
import AuthAltLink from "../../common/AuthAltLink";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    // TODO: create account via backend, then:
    login({ email }); // auto-login after signup
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
