import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormLayout,
  FormCard,
  FormField,
  FormAltLink,
  Button,
} from "../../common";
import { updateUserPassword } from "../../auth/authStore";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  current: z.string().min(1, "Current password is required"),
  next: z.string().min(6, "Min. 6 characters"),
});

export default function Password() {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { email: "", current: "", next: "" },
  });

  async function onSubmit(values) {
    clearErrors("root");
    try {
      await updateUserPassword(values.email, values.current, values.next);
      nav("/login", {
        replace: true,
        state: { msg: "Password updated. Please sign in." },
      });
    } catch (e) {
      setError("root", { message: e?.message || "Unable to update password." });
    }
  }

  return (
    <FormLayout>
      <FormCard title="Change Password" onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {errors.root.message}
          </div>
        )}

        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          register={register}
          error={errors.email?.message}
        />

        <FormField
          label="Current password"
          name="current"
          type="password"
          placeholder="Your current password"
          register={register}
          error={errors.current?.message}
        />

        <FormField
          label="New password"
          name="next"
          type="password"
          placeholder="Min. 6 characters"
          register={register}
          error={errors.next?.message}
        />

        <Button
          as="button"
          type="submit"
          className="w-full"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "Updating…" : "Update password"}
        </Button>

        <div className="mt-3">
          <FormAltLink to="/login">Back to sign in</FormAltLink>
        </div>
      </FormCard>
    </FormLayout>
  );
}
