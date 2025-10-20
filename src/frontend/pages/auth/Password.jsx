import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  FormLayout,
  FormCard,
  FormField,
  FormSubmit,
  FormAltLink,
} from "../../common";
import { updateUserPassword } from "../../auth/authStore";

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function Password() {
  const nav = useNavigate();
  const [vals, setVals] = useState({ email: "", current: "", next: "" });
  const [touched, setTouched] = useState({});
  const [err, setErr] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!vals.email) e.email = "Email is required";
    else if (!isEmail(vals.email)) e.email = "Enter a valid email";
    if (!vals.current) e.current = "Current password is required";
    if (!vals.next) e.next = "New password is required";
    else if (vals.next.length < 6) e.next = "Min. 6 characters";
    return e;
  }, [vals]);

  const canSubmit =
    vals.email &&
    vals.current &&
    vals.next &&
    Object.keys(errors).length === 0 &&
    !submitting;

  function touch(f) {
    setTouched((t) => ({ ...t, [f]: true }));
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    setErr("");
    setTouched({ email: true, current: true, next: true });
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      await updateUserPassword(vals.email, vals.current, vals.next);
      nav("/login", {
        replace: true,
        state: { msg: "Password updated. Please sign in." },
      });
    } catch (e) {
      setErr(e?.message || "Unable to update password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormLayout>
      <FormCard title="Change Password" onSubmit={onSubmit}>
        {err && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {err}
          </div>
        )}
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={vals.email}
          onChange={(e) => setVals((v) => ({ ...v, email: e.target.value }))}
          onBlur={() => touch("email")}
          error={errors.email}
          showError={!!touched.email}
        />
        <FormField
          label="Current password"
          name="current"
          type="password"
          placeholder="Your current password"
          required
          value={vals.current}
          onChange={(e) => setVals((v) => ({ ...v, current: e.target.value }))}
          onBlur={() => touch("current")}
          error={errors.current}
          showError={!!touched.current}
        />
        <FormField
          label="New password"
          name="next"
          type="password"
          placeholder="Min. 6 characters"
          required
          value={vals.next}
          onChange={(e) => setVals((v) => ({ ...v, next: e.target.value }))}
          onBlur={() => touch("next")}
          error={errors.next}
          showError={!!touched.next}
        />
        <FormSubmit disabled={!canSubmit}>
          {submitting ? "Updating…" : "Update password"}
        </FormSubmit>
        <div className="mt-3">
          <FormAltLink to="/login">Back to sign in</FormAltLink>
        </div>
      </FormCard>
    </FormLayout>
  );
}
