export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="text-sm text-gray-500">
      {items.map((it, i) => (
        <span key={i}>
          <span>{it.label}</span>
          {i < items.length - 1 && (
            <span className="mx-2 text-gray-300">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
