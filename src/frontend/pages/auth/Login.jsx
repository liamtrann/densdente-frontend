// src/frontend/pages/auth/Login.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import {
  FormLayout,
  FormCard,
  FormField,
  FormSubmit,
  FormAltLink, // still used for "reset password" link
} from "../../common";
import { verifyUser } from "../../auth/authStore";

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!values.email) e.email = "Email is required";
    else if (!validateEmail(values.email)) e.email = "Enter a valid email";
    if (!values.password) e.password = "Password is required";
    else if (values.password.length < 6) e.password = "Min. 6 characters";
    return e;
  }, [values]);

  const canSubmit =
    values.email &&
    values.password &&
    Object.keys(errors).length === 0 &&
    !submitting;

  function markTouched(field) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setFormError("");
    setTouched({ email: true, password: true });
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      const user = verifyUser(values.email, values.password);
      if (!user) {
        setFormError("Incorrect email or password.");
        return;
      }
      login(user);
      navigate(from, { replace: true });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormLayout>
      <FormCard title="Sign In" onSubmit={onSubmit}>
        {formError && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {formError}
          </div>
        )}

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

        <div className="mb-2">
          <FormAltLink to="/password">
            Click here to reset or change your password
          </FormAltLink>
        </div>

        <FormSubmit disabled={!canSubmit}>
          {submitting ? "Signing in…" : "Sign In"}
        </FormSubmit>

        <div className="mt-3">
          <a
            className="inline-block text-indigo-600 font-medium"
            href="https://youtube.com/watch?si=7YpOems5HIJLt9mI&v=SM-VtUP88IY&feature=youtu.be"
            target="_blank"
            rel="noreferrer"
          >
            Link to Dentaparse tutorial video
          </a>
        </div>

      </FormCard>
    </FormLayout>
  );
}
