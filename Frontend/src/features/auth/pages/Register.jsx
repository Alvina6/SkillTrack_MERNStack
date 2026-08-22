import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import "../auth.style.scss";

const Register = ({ onSwitch }) => {
  const { handle_register, loading } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
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

      await handle_register({
        username: form.fullName,
        email: form.email,
        password: form.password,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "We couldn't create your account. Please try again.",
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
            <button type="button" className="auth-tab" onClick={onSwitch}>
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

              <span className="auth-field__hint">
                Use at least 8 characters with a mix of letters and numbers.
              </span>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <label className="auth-terms">
              <input type="checkbox" required />

              <span>
                I agree to the terms of service and acknowledge the privacy
                policy.
              </span>
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}

              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <button type="button" onClick={onSwitch}>
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
