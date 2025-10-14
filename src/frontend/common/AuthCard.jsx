export default function AuthCard({ title, children, onSubmit }) {
  return (
    <form className="auth-card" onSubmit={onSubmit}>
      <div className="auth-logo">
        <img src="/logo192.png" alt="Dentaparse" width="80" height="80" />
      </div>
      {title && <h1 className="auth-title">{title}</h1>}
      {children}
    </form>
  );
}
