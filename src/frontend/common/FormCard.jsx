export default function FormCard({ title, onSubmit, children }) {
  return (
    <form className="w-[420px] max-w-[90%]" onSubmit={onSubmit}>
      <div className="mb-5">
        <img src="/logo192.png" alt="Dentaparse" width="80" height="80" />
      </div>
      <h1 className="font-extrabold text-2xl mb-3">{title}</h1>
      {children}
    </form>
  );
}
