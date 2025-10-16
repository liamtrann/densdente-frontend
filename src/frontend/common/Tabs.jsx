// Minimal pill-style tabs
export default function Tabs({ value, onChange, items = [] }) {
  return (
    <div className="flex gap-3 my-2">
      {items.map(({ id, label }) => {
        const active = value === id;
        return (
          <button
            key={id}
            onClick={() => onChange?.(id)}
            className={`px-4 py-2 rounded-full font-bold transition-colors ${
              active
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
