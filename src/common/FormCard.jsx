export default function FormCard({
  title,
  onSubmit,
  children,
  // new props with sensible defaults
  logoSrc = "/img/dentalogo.png",
  logoAlt = "Dentaparse",
}) {
  return (
    <form className="w-[420px] max-w-[90%]" onSubmit={onSubmit}>
      {/* Logo */}
      {logoSrc && (
        <div className="mb-6">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="max-w-full"
            width={420}
            height={120}
          />
        </div>
      )}

      <h1 className="font-extrabold text-2xl mb-3">{title}</h1>
      {children}
    </form>
  );
}
