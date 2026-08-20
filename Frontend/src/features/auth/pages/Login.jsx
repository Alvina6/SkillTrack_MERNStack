import React, { useState } from "react";
import "../auth.style.scss";

// ---- Small inline icon set (no external icon library required) ----
const IconLogo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M17 7h4v4" />
  </svg>
);

const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const IconLock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="11" width="16" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
);

const IconEye = ({ open }) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a19.6 19.6 0 015.06-6.06M9.9 4.24A10.6 10.6 0 0112 4c7 0 11 8 11 8a19.7 19.7 0 01-3.11 4.36" />
      <path d="M1 1l22 22" />
      <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
    </svg>
  );

const IconAlert = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v5" />
    <path d="M12 16h.01" />
  </svg>
);

const IconArt = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 200 160" fill="none">
    <rect
      x="20"
      y="20"
      width="160"
      height="120"
      rx="14"
      fill="#ffffff"
      stroke="#c9d2ef"
      strokeWidth="1.5"
    />
    <path
      d="M40 105l30-30 22 22 48-48"
      stroke="#1e3a9c"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M120 49h20v20"
      stroke="#1e3a9c"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="40" cy="105" r="5" fill="#1e3a9c" />
    <circle cx="70" cy="75" r="5" fill="#1e3a9c" />
    <circle cx="92" cy="97" r="5" fill="#1e3a9c" />
    <circle cx="140" cy="49" r="5" fill="#1e3a9c" />
  </svg>
);

/**
 * SkillTrack — Sign In page
 *
 * Props:
 *   onSubmit(values)      -> called with { email, password, rememberMe } on valid submit
 *   onNavigateToSignUp()  -> called when the user clicks the "Sign Up" tab / footer link
 *   onForgotPassword()    -> called when the user clicks "Forgot password?"
 *   isSubmitting          -> boolean, shows loading state on the button
 *   serverError           -> string | null, shown as a banner above the form
 */
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function Login({
  onSubmit,
  onNavigateToSignUp,
  onForgotPassword,
  isSubmitting = false,
  serverError = null,
}) {
  const { loading, handle_login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Enter your password.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await handle_login({ email, password });
    navigate("/Dashboard");
  };

  if (loading) {
    return (
      <main>
        {" "}
        <h1>loading.....</h1>
      </main>
    );
  }

  return (
    <div className="auth-page">
      {/* Left brand panel */}
      <aside className="auth-panel">
        <div className="auth-panel__glow" />

        {/* Floating themed glyphs — echoes a blurred dashboard behind the mark */}
        <div className="auth-panel__deco" aria-hidden="true">
          <svg
            className="deco-chart"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 20V10M11 20V4M18 20v-7" />
          </svg>
          <svg
            className="deco-trend"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 17l6-6 4 4 8-8" />
            <path d="M17 7h4v4" />
          </svg>
          <svg
            className="deco-ring"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.4"
          >
            <circle cx="12" cy="12" r="9" />
          </svg>
          <svg className="deco-dot-a" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
          <svg className="deco-dot-b" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" />
          </svg>
        </div>

        <div className="auth-panel__brand">
          <span className="auth-panel__logo-mark">
            <IconLogo />
          </span>
          <span className="auth-panel__brand-name">SkillTrack</span>
        </div>

        <div className="auth-panel__art">
          <IconArt className="art-main" />
        </div>

        <div className="auth-panel__caption">
          <p className="auth-panel__caption-title">
            Master your career trajectory.
          </p>
          <p className="auth-panel__caption-text">
            SkillTrack provides the precision tools you need to manage
            applications, track progress, and secure your next professional
            milestone.
          </p>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-card__brand-mobile">
            <IconLogo />
            <span>SkillTrack</span>
          </div>

          <p className="auth-card__eyebrow">SkillTrack</p>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">
            Please enter your credentials to access your dashboard.
          </p>

          <nav className="auth-tabs">
            <span className="auth-tabs__link auth-tabs__link--active">
              Sign In
            </span>
            <button
              type="button"
              className="auth-tabs__link"
              onClick={onNavigateToSignUp}
            >
              Sign Up
            </button>
          </nav>

          {serverError && (
            <div className="auth-banner auth-banner--error" role="alert">
              <IconAlert />
              <span>{serverError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="login-email">
                Email address
              </label>
              <div className="form-field__control">
                <IconMail />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={email}
                  data-invalid={Boolean(errors.email)}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="form-field__error">{errors.email}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="login-password">
                Password
              </label>
              <div className="form-field__control form-field__control--password">
                <IconLock />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  data-invalid={Boolean(errors.password)}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="form-field__toggle-visibility"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <IconEye open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="form-field__error">{errors.password}</p>
              )}
            </div>

            <div className="auth-aux-row">
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="auth-link"
                onClick={onForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="btn-primary__spinner" />}
              {isSubmitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="auth-footer">
            Don&apos;t have an account?
            <button
              type="button"
              className="auth-link"
              onClick={onNavigateToSignUp}
            >
              Sign up now
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
