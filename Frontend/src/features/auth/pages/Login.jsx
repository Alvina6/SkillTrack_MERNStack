import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "../auth.style.scss";

const Login = ({ onSwitch }) => {
  const { handle_login, loading } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await handle_login({
        email: form.email,
        password: form.password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "We couldn't sign you in. Please check your details.",
      );
    }
  };

  return (
    <main className="auth-page">
      {/* LEFT EDITORIAL PANEL */}
      <section className="auth-editorial">
        <div className="auth-editorial__content">
          <span className="auth-editorial__index">01 / SIGN IN</span>

          <h1>
            Keep your
            <br />
            <em>career moving.</em>
          </h1>

          <p>
            Track applications, strengthen your skills, and keep sight of the
            goals that matter to your next opportunity.
          </p>
        </div>

        <div className="auth-editorial__footer">
          <span>SKILLTRACK</span>
          <span>CAREER MANAGEMENT</span>
        </div>
      </section>

      {/* FORM */}
      <section className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-heading">
            <span className="auth-heading__label">WELCOME BACK</span>

            <h2>Sign in</h2>

            <p>Access your applications, skills, and career goals.</p>
          </div>

          <div className="auth-tabs">
            <button type="button" className="auth-tab auth-tab--active">
              Sign in
            </button>

            <button type="button" className="auth-tab" onClick={onSwitch}>
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="email">Email address</label>

              <div className="auth-input">
                <Mail size={16} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <div className="auth-field__label-row">
                <label htmlFor="password">Password</label>

                <button type="button" className="auth-small-link">
                  Forgot password?
                </button>
              </div>

              <div className="auth-input">
                <Lock size={16} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}

              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?
            <button type="button" onClick={onSwitch}>
              Create one
            </button>
          </p>

          <div className="auth-note">
            Your career workspace is private to your account.
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
