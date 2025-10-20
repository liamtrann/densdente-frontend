export default function FormSubmit({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-3 font-bold mt-3
        ${
          disabled
            ? "bg-indigo-400/50 text-white cursor-not-allowed"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
    >
      {children}
    </button>
  );
}
