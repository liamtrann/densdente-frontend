export default function AuthSubmit({ children }) {
  return (
    <button
      type="submit"
      className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 mt-2"
    >
      {children}
    </button>
  );
}
