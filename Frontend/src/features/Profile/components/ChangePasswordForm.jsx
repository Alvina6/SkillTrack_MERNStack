import { useState } from "react";
import { KeyRound, Lock, Save, Check, X } from "lucide-react";

import { changePasswordAPI } from "../services/profile.api";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const newPasswordChecks = [
    {
      label: "At least 8 characters",
      passed: formData.newPassword.length >= 8,
    },
    {
      label: "No more than 72 characters",
      passed:
        formData.newPassword.length > 0 && formData.newPassword.length <= 72,
    },
    {
      label: "One lowercase letter",
      passed: /[a-z]/.test(formData.newPassword),
    },
    {
      label: "One uppercase letter",
      passed: /[A-Z]/.test(formData.newPassword),
    },
    { label: "One number", passed: /\d/.test(formData.newPassword) },
    {
      label: "One special character from @$!%*?&",
      passed: /[@$!%*?&]/.test(formData.newPassword),
    },
    {
      label: "Only letters, numbers, and @$!%*?&",
      passed:
        formData.newPassword.length > 0 &&
        /^[A-Za-z\d@$!%*?&]+$(?![\s\S])/.test(formData.newPassword),
    },
  ];
  const newPasswordValid = newPasswordChecks.every((check) => check.passed);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await changePasswordAPI(formData);

      setMessage(response.message || "Password changed successfully.");

      setFormData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="password-section">
      <div className="profile-section__header">
        <div>
          <span className="profile-eyebrow">Account security</span>

          <h2>Change password</h2>

          <p>Update your password to keep your account secure.</p>
        </div>

        <div className="profile-section__icon">
          <KeyRound size={18} strokeWidth={1.5} />
        </div>
      </div>

      <form className="password-form" onSubmit={handleSubmit}>
        {/* CURRENT PASSWORD */}

        <div className="profile-form__field">
          <label htmlFor="currentPassword">Current password</label>

          <div className="profile-input-with-icon">
            <Lock size={15} strokeWidth={1.5} />

            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />
          </div>
        </div>

        {/* NEW PASSWORD */}

        <div className="profile-form__field">
          <label htmlFor="newPassword">New password</label>

          <div className="profile-input-with-icon">
            <Lock size={15} strokeWidth={1.5} />

            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              minLength={8}
              maxLength={72}
              required
            />
          </div>
        </div>

        <ul
          className="password-checklist"
          aria-label="New password requirements"
          aria-live="polite"
        >
          {newPasswordChecks.map(({ label, passed }) => (
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

        {/* MESSAGE */}

        {message && (
          <div className="profile-message profile-message--success">
            {message}
          </div>
        )}

        {error && (
          <div className="profile-message profile-message--error">{error}</div>
        )}

        {/* BUTTON */}

        <div className="profile-form__actions">
          <button
            type="submit"
            className="profile-save-btn"
            disabled={loading || !newPasswordValid}
          >
            <Save size={15} strokeWidth={1.5} />

            {loading ? "Updating..." : "Change password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ChangePasswordForm;
