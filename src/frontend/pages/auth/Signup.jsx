import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import {
  FormLayout,
  FormCard,
  FormField,
  FormSubmit,
  FormAltLink,
} from "../../common";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    login({ email }); // auto-login after signup
    navigate("/admin", { replace: true });
  }

  return (
    <FormLayout>
      <FormCard title="Create Account" onSubmit={onSubmit}>
        <FormField label="Full name" name="name" placeholder="Your name" />
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
        <FormSubmit>Sign Up</FormSubmit>
        <FormAltLink to="/login">Already have an account? Sign in</FormAltLink>
      </FormCard>
    </FormLayout>
  );
}
