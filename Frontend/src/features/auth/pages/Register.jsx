import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import "../auth.style.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { handle_register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const passwordChecks = [
    { label: "At least 8 characters", passed: form.password.length >= 8 },
    {
      label: "No more than 72 characters",
      passed: form.password.length > 0 && form.password.length <= 72,
    },
    { label: "One lowercase letter", passed: /[a-z]/.test(form.password) },
    { label: "One uppercase letter", passed: /[A-Z]/.test(form.password) },
    { label: "One number", passed: /\d/.test(form.password) },
    {
      label: "One special character (@ $ ! % * ? &)",
      passed: /[@$!%*?&]/.test(form.password),
    },
    {
      label: "Only letters, numbers, and @ $ ! % * ? &",
      passed:
        form.password.length > 0 &&
        /^[A-Za-z\d@$!%*?&]+$(?![\s\S])/.test(form.password),
    },
  ];
  const passwordValid = passwordChecks.every((check) => check.passed);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValid) {
      setError(
        "Please meet all password requirements before creating your account.",
      );
      return;
    }

    try {
      setError("");

      await handle_register({
        username: form.fullName,
        email: form.email,
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "We couldn't create your account. Please try again.";
      const requirements = err?.response?.data?.requirements;
      setError(
        requirements?.length
          ? `${message} ${requirements.join("; ")}.`
          : message,
      );
    }
  };

  return (
    <main className="auth-page">
      {/* LEFT EDITORIAL PANEL */}
      <section className="auth-editorial">
        <div className="auth-editorial__content">
          <span className="auth-editorial__index">02 / JOIN</span>

          <h1>
            Build a
            <br />
            <em>career with intent.</em>
          </h1>

          <p>
            SkillTrack gives you one place to organize the opportunities,
            capabilities, and milestones shaping your professional journey.
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
            <span className="auth-heading__label">GET STARTED</span>

            <h2>Create account</h2>

            <p>Set up your personal career workspace in a few steps.</p>
          </div>

          <div className="auth-tabs">
            <button
              type="button"
              className="auth-tab"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>

            <button type="button" className="auth-tab auth-tab--active">
              Create account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="fullName">Full name</label>

              <div className="auth-input">
                <User size={16} />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </div>
            </div>

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
              <label htmlFor="password">Password</label>

              <div className="auth-input">
                <Lock size={16} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  maxLength={72}
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

              <ul
                className="password-checklist"
                aria-label="Password requirements"
                aria-live="polite"
              >
                {passwordChecks.map(({ label, passed }) => (
                  <li
                    className={
                      passed
                        ? "password-checklist__item password-checklist__item--passed"
                        : "password-checklist__item"
                    }
                    key={label}
                  >
                    <span aria-hidden="true">
                      {passed ? <Check size={12} /> : <X size={12} />}
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <label className="auth-terms">
              <input type="checkbox" required />

              <span>
                I agree to the terms of service and acknowledge the privacy
                policy.
              </span>
            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading || !passwordValid}
            >
              {loading ? "Creating account..." : "Create account"}

              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <button type="button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>

          <div className="auth-note">
            Your information is used only to personalize your workspace.
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
