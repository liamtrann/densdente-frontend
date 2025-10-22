export default function Card({
  children,
  title,
  right,
  className = "",
  bodyClassName = "",
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-md ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          {title && <h3 className="m-0 text-base font-semibold">{title}</h3>}
          {right && <div>{right}</div>}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
