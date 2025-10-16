export default function Badge({ children, color = "neutral" }) {
  const map = {
    success: "bg-emerald-50 text-emerald-600",
    danger: "bg-rose-50 text-rose-600",
    neutral: "bg-indigo-50 text-indigo-700",
  };
  return (
    <span
      className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${map[color]}`}
    >
      {children}
    </span>
  );
}
