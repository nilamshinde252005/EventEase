import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stops the form from refreshing the page
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/events");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <div className="login-page">
      {/* Hint box in the corner */}
      <div className="login-hint-box">
        <p className="login-hint-title">Access info</p>
        <p className="login-hint-text">
          <span>Normal user:</span> create your own account on the register
          page to see and register for events.
        </p>
        <p className="login-hint-text">
          <span>Admin demo:</span> use
          <br />
          <strong>admin@example.com</strong>
          <br />
          <strong>admin123</strong>
        </p>
      </div>

      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <p className="login-subtitle">
          Sign in to access <strong>EventEase</strong> and manage your student
          events.
        </p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@example.com"
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
