import { Link } from "react-router-dom";
export default function FormAltLink({ to, children }) {
  return (
    <Link className="inline-block mt-3 text-indigo-600 font-medium" to={to}>
      {children}
    </Link>
  );
}
