export default function AuthCard({ title, children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-[420px] max-w-[90%]">
      <div className="mb-5">
        <img src="/logo192.png" alt="Dentaparse" width="80" height="80" />
      </div>
      {title && <h1 className="text-3xl font-extrabold mb-3">{title}</h1>}
      {children}
    </form>
  );
}
