export default function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  defaultValue,
}) {
  return (
    <>
      {label && (
        <label>
          {label}
          {required ? "*" : ""}
        </label>
      )}
      <input
        className="auth-field"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </>
  );
}
