export default function AuthField({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  defaultValue,
}) {
  return (
    <div className="mb-3">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
          {required ? "*" : ""}
        </label>
      )}
      <input
        className="w-full px-3 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-200"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </div>
  );
}
