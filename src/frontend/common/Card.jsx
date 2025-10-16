export default function Card({
  children,
  title,
  right,
  className = "",
  bodyClassName = "", // NEW: control body padding (e.g., "p-0")
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-md ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
          {title && <h3 className="m-0 text-[15px] font-semibold">{title}</h3>}
          {right && <div>{right}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </div>
  );
}
