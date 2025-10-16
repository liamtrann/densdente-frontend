import { Link } from "react-router-dom";
export default function AuthAltLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-block mt-2 text-indigo-600 hover:text-indigo-700"
    >
      {children}
    </Link>
  );
}
