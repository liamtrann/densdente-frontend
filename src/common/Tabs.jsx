// Simple controlled Tabs
export default function Tabs({
  value, // string: the active tab key
  onChange, // (key) => void
  items = [], // [{ key, label, disabled? }]
  className = "",
}) {
  return (
    <div className={`flex gap-3 mb-4 ${className}`}>
      {items.map((t) => {
        const active = value === t.key;
        return (
          <button
            key={t.key}
            type="button"
            disabled={t.disabled}
            onClick={() => !t.disabled && onChange?.(t.key)}
            className={
              `px-5 py-2 rounded-full font-bold transition-colors ` +
              (active
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100") +
              (t.disabled ? " opacity-50 cursor-not-allowed" : "")
            }
            role="tab"
            aria-selected={active}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
