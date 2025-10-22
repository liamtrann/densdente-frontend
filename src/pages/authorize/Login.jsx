import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "../../auth/AuthContext";
import {
  FormLayout,
  FormCard,
  FormField,
  FormAltLink,
  Button,
} from "../../common";
import { verifyUser } from "../../auth/authStore";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min. 6 characters"),
});

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/admin";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values) {
    clearErrors("root");
    const user = verifyUser(values.email, values.password);
    if (!user) {
      setError("root", { message: "Incorrect email or password." });
      return;
    }
    login(user);
    nav(from, { replace: true });
  }

  return (
    <FormLayout>
      <FormCard title="Sign In" onSubmit={handleSubmit(onSubmit)}>
        {/* banner for form-level errors */}
        {errors.root?.message && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errors.root.message}
          </div>
        )}

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          register={register}
          error={errors.email?.message}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          placeholder="Min. 6 characters"
          register={register}
          error={errors.password?.message}
        />

        <div className="mb-2">
          <FormAltLink to="/password">
            Click here to reset or change your password
          </FormAltLink>
        </div>

        <Button
          as="button"
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Signing in…" : "Sign In"}
        </Button>

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
