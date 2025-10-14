import { Link } from "react-router-dom";

export default function AuthAltLink({ to, children }) {
  return (
    <Link className="auth-link" to={to}>
      {children}
    </Link>
  );
}
