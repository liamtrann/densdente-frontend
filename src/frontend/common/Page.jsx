// Simple page wrapper for consistent padding/background
export default function Page({ className = "", children }) {
  return (
    <div
      className={`min-h-screen bg-indigo-50/40 text-gray-900 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
