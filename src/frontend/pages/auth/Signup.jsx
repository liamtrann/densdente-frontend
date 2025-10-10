import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    // TODO: call your backend to create account, then:
    login({ email }); // auto-login after signup
    navigate("/admin", { replace: true });
  }

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <form className="auth-card" onSubmit={onSubmit}>
          <div className="auth-logo">
            <img src="/logo192.png" alt="Dentaparse" width="80" height="80" />
          </div>
          <h1 className="auth-title">Create Account</h1>
          <label>Full name*</label>
          <input
            className="auth-field"
            name="name"
            placeholder="Your name"
            required
          />
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
            Sign Up
          </button>
          <Link className="auth-link" to="/login">
            Already have an account? Sign in
          </Link>
        </form>
      </div>
      <div className="auth-right" />
    </div>
  );
}
