export default function FormField({ label, ...props }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className="w-full rounded-xl border border-gray-200 px-3 py-2 mt-1 mb-2 outline-none focus:ring-2 focus:ring-indigo-200"
        {...props}
      />
    </>
  );
}
