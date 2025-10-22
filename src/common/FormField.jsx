import { useId } from "react";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  error,
  showError = true,
  rightIcon,
  register, // <-- new
  rules, // <-- new
}) {
  const id = useId();
  const inputProps = register
    ? { ...register(name, rules) } // RHF controls
    : { value, onChange, onBlur }; // fallback controlled

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div className="mt-2 relative">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
          {...inputProps}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>

      {showError && error && (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      )}
    </div>
  );
}
