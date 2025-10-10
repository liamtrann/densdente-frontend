import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    // do real API call here later, then:
    login({ email });
    navigate(from, { replace: true });
  }

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <form className="auth-card" onSubmit={onSubmit}>
          <div className="auth-logo">
            <img src="/logo192.png" alt="Dentaparse" width="80" height="80" />
          </div>
          <h1 className="auth-title">Sign In</h1>
          <label>Email*</label>
          <input
            className="auth-field"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <label>Password*</label>
          <input
            className="auth-field"
            type="password"
            name="password"
            placeholder="Min. 6 characters"
            required
          />
          <button className="auth-btn" type="submit">
            Sign In
          </button>
          <Link className="auth-link" to="/signup">
            Create an account
          </Link>
        </form>
      </div>
      <div className="auth-right" />
    </div>
  );
}
