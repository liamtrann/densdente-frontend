import "../pages/auth/auth.css";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-wrap">
      <div className="auth-left">{children}</div>
      <div className="auth-right" />
    </div>
  );
}
