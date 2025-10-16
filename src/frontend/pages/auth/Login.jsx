import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  FormLayout,
  FormCard,
  FormField,
  FormSubmit,
  FormAltLink,
} from "../../common";

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
    <FormLayout>
      <FormCard title="Sign In" onSubmit={onSubmit}>
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 6 characters"
        />
        <FormSubmit>Sign In</FormSubmit>
        <FormAltLink to="/signup">Create an account</FormAltLink>
      </FormCard>
    </FormLayout>
  );
}
