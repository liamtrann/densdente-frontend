import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import AuthLayout from "../../common/AuthLayout";
import AuthCard from "../../common/AuthCard";
import AuthField from "../../common/AuthField";
import AuthSubmit from "../../common/AuthSubmit";
import AuthAltLink from "../../common/AuthAltLink";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
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
