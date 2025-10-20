import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import {
  FormLayout,
  FormCard,
  FormField,
  FormSubmit,
  FormAltLink,
} from "../../common";
import { createUser } from "../../auth/authStore";

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!values.name) e.name = "Full name is required";
    else if (values.name.trim().length < 2) e.name = "Enter your full name";
    if (!values.email) e.email = "Email is required";
    else if (!validateEmail(values.email)) e.email = "Enter a valid email";
    if (!values.password) e.password = "Password is required";
    else if (values.password.length < 6) e.password = "Min. 6 characters";
    return e;
  }, [values]);

  const canSubmit =
    values.name &&
    values.email &&
    values.password &&
    Object.keys(errors).length === 0 &&
    !submitting;

  function markTouched(f) {
    setTouched((t) => ({ ...t, [f]: true }));
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setFormError("");
    setTouched({ name: true, email: true, password: true });
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      const user = createUser(values); // throws if duplicate/invalid
      login(user); // { name, email }
      navigate("/admin", { replace: true });
    } catch (err) {
      setFormError(err?.message || "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormLayout>
      <FormCard title="Create Account" onSubmit={onSubmit}>
        {formError && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {formError}
          </div>
        )}

        <FormField
          label="Full name"
          name="name"
          placeholder="Your name"
          required
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          onBlur={() => markTouched("name")}
          error={errors.name}
          showError={!!touched.name}
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          onBlur={() => markTouched("email")}
          error={errors.email}
          showError={!!touched.email}
        />

        <FormField
          label="Password"
          name="password"
          type={showPw ? "text" : "password"}
          placeholder="Min. 6 characters"
          required
          value={values.password}
          onChange={(e) =>
            setValues((v) => ({ ...v, password: e.target.value }))
          }
          onBlur={() => markTouched("password")}
          error={errors.password}
          showError={!!touched.password}
          rightIcon={
            <button
              type="button"
              aria-label="Toggle password visibility"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowPw((s) => !s)}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          }
        />

        <FormSubmit disabled={!canSubmit}>
          {submitting ? "Creating…" : "Sign Up"}
        </FormSubmit>

        <div className="mt-3">
          <FormAltLink to="/login">
            Already have an account? Sign in
          </FormAltLink>
        </div>
      </FormCard>
    </FormLayout>
  );
}
