import { useId } from "react";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur, // pass from parent to mark as touched
  error,
  required,
  showError, // parent decides when to show (touched or submit)
  rightIcon, // optional (e.g., eye icon toggle)
}) {
  const id = useId();
  const danger = showError && !!error;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-rose-600">*</span>}
      </label>

      <div className={`mt-2 relative`}>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full rounded-xl border px-4 py-3 outline-none transition
            ${
              danger
                ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                : "border-gray-200 focus:ring-2 focus:ring-indigo-500"
            }`}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 select-none">
            {rightIcon}
          </div>
        )}
      </div>

      {danger && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
