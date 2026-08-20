import React, { useMemo, useState } from "react";
import "../auth.style.scss";

// ---- Small inline icon set (shared visual language with Login.jsx) ----
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

const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
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
import { useContext } from "react";
import { useAuth } from "../hooks/useAuth";
// ---- Password strength helper ----
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 1, label: "weak" };
  if (score <= 2) return { score: 2, label: "fair" };
  if (score === 3) return { score: 3, label: "fair" };
  return { score: 4, label: "strong" };
}

/**
 * SkillTrack — Sign Up page
 *
 * Props:
 *   onSubmit(values)      -> called with { fullName, email, password, agreedToTerms } on valid submit
 *   onNavigateToSignIn()  -> called when the user clicks the "Sign In" tab / footer link
 *   isSubmitting          -> boolean, shows loading state on the button
 *   serverError           -> string | null, shown as a banner above the form
 */

import { useNavigate } from "react-router-dom";
export default function Register({
  onSubmit,
  onNavigateToSignIn,
  isSubmitting = false,
  serverError = null,
}) {
  const { loading, handle_register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const validate = () => {
    const next = {};
    if (!fullName.trim()) {
      next.fullName = "Enter your full name.";
    }
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!password) {
      next.password = "Create a password.";
    } else if (password.length < 8) {
      next.password = "Use at least 8 characters.";
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "Passwords do not match.";
    }
    if (!agreedToTerms) {
      next.agreedToTerms = "You must accept the terms to continue.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await handle_register({ username: fullname, email, password });
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <main>
        <h1>loading .....</h1>
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
          <h1 className="auth-card__title">Create your account</h1>
          <p className="auth-card__subtitle">
            Start tracking applications and building your career plan today.
          </p>

          <nav className="auth-tabs">
            <button
              type="button"
              className="auth-tabs__link"
              onClick={onNavigateToSignIn}
            >
              Sign In
            </button>
            <span className="auth-tabs__link auth-tabs__link--active">
              Sign Up
            </span>
          </nav>

          {serverError && (
            <div className="auth-banner auth-banner--error" role="alert">
              <IconAlert />
              <span>{serverError}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label className="form-field__label" htmlFor="signup-name">
                Full name
              </label>
              <div className="form-field__control">
                <IconUser />
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jordan Ahmed"
                  value={fullName}
                  data-invalid={Boolean(errors.fullName)}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              {errors.fullName && (
                <p className="form-field__error">{errors.fullName}</p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="signup-email">
                Email address
              </label>
              <div className="form-field__control">
                <IconMail />
                <input
                  id="signup-email"
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
              <label className="form-field__label" htmlFor="signup-password">
                Password
              </label>
              <div className="form-field__control form-field__control--password">
                <IconLock />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
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

              {password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className={
                          "password-strength__bar" +
                          (i <= strength.score
                            ? ` password-strength__bar--filled-${strength.label}`
                            : "")
                        }
                      />
                    ))}
                  </div>
                  <p
                    className={`password-strength-label password-strength-label--${strength.label}`}
                  >
                    {strength.label === "weak" &&
                      "Weak — add numbers, symbols and a capital letter."}
                    {strength.label === "fair" &&
                      "Fair — a mix of characters strengthens it further."}
                    {strength.label === "strong" && "Strong password."}
                  </p>
                </>
              )}
              {errors.password && (
                <p className="form-field__error">{errors.password}</p>
              )}
              {!errors.password && !password && (
                <p className="form-field__hint">Use at least 8 characters.</p>
              )}
            </div>

            <div className="terms-field">
              <input
                id="signup-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="signup-terms">
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>
            {errors.agreedToTerms && (
              <p className="form-field__error">{errors.agreedToTerms}</p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting && <span className="btn-primary__spinner" />}
              {isSubmitting ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?
            <button
              type="button"
              className="auth-link"
              onClick={onNavigateToSignIn}
            >
              Sign in
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
