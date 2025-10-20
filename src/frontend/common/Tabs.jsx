// Simple pill tabs
export default function Tabs({ items = [], value, onChange, className = "" }) {
  return (
    <div className={`flex gap-3 my-4 ${className}`}>
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange?.(it.key)}
            className={[
              "px-5 py-2 rounded-full font-bold transition-colors",
              active
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
              it.disabled && "opacity-50 cursor-not-allowed",
            ].join(" ")}
            disabled={it.disabled}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
