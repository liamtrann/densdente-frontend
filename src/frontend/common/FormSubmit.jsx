export default function FormSubmit({ children }) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold mt-3 hover:bg-indigo-700"
    >
      {children}
    </button>
  );
}
