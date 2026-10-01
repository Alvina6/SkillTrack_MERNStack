import React, { useEffect, useState } from "react";
import { Link2, Code2, Save, User, Globe } from "lucide-react";

import { updateProfileAPI } from "../services/profile.api";

const ProfileForm = ({ user, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    headline: "",
    bio: "",
    linkedinUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    targetRole: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        fullName: user.fullName || "",
        headline: user.headline || "",
        bio: user.bio || "",
        linkedinUrl: user.linkedinUrl || "",
        githubUrl: user.githubUrl || "",
        portfolioUrl: user.portfolioUrl || "",
        targetRole: user.targetRole || "",
      });
    }
  }, [user]);

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
      const response = await updateProfileAPI(formData);

      setMessage(response.message || "Profile updated successfully.");

      if (onProfileUpdated) {
        onProfileUpdated(response.user);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="profile-section">
      <div className="profile-section__header">
        <div>
          <span className="profile-eyebrow">Personal information</span>

          <h2>Profile details</h2>

          <p>Keep your professional information up to date.</p>
        </div>

        <div className="profile-section__icon">
          <User size={18} strokeWidth={1.5} />
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        {/* USERNAME */}

        <div className="profile-form__field">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your username"
            minLength={6}
            required
          />
        </div>

        {/* EMAIL */}

        <div className="profile-form__field">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* FULL NAME */}

        <div className="profile-form__field">
          <label htmlFor="fullName">Full name</label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            maxLength={100}
          />
        </div>

        {/* TARGET ROLE */}

        <div className="profile-form__field">
          <label htmlFor="targetRole">Target role</label>

          <input
            id="targetRole"
            name="targetRole"
            type="text"
            value={formData.targetRole}
            onChange={handleChange}
            placeholder="e.g. Backend Developer"
          />
        </div>

        {/* HEADLINE */}

        <div className="profile-form__field profile-form__field--full">
          <label htmlFor="headline">Professional headline</label>

          <input
            id="headline"
            name="headline"
            type="text"
            value={formData.headline}
            onChange={handleChange}
            placeholder="e.g. Computer Science student | Backend Developer"
            maxLength={100}
          />
        </div>

        {/* BIO */}

        <div className="profile-form__field profile-form__field--full">
          <label htmlFor="bio">Bio</label>

          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us a little about yourself..."
            maxLength={300}
            rows={5}
          />

          <span className="profile-form__counter">
            {formData.bio.length}/300
          </span>
        </div>

        {/* SOCIAL LINKS */}

        <div className="profile-form__divider">
          <span>Professional links</span>
        </div>

        {/* LINKEDIN */}

        <div className="profile-form__field">
          <label htmlFor="linkedinUrl">LinkedIn</label>

          <div className="profile-input-with-icon">
            <Link2 size={15} strokeWidth={1.5} />

            <input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>

        {/* GITHUB */}

        <div className="profile-form__field">
          <label htmlFor="githubUrl">GitHub</label>

          <div className="profile-input-with-icon">
            <Code2 size={15} strokeWidth={1.5} />

            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        {/* PORTFOLIO */}

        <div className="profile-form__field profile-form__field--full">
          <label htmlFor="portfolioUrl">Portfolio</label>

          <div className="profile-input-with-icon">
            <Globe size={15} strokeWidth={1.5} />

            <input
              id="portfolioUrl"
              name="portfolioUrl"
              type="url"
              value={formData.portfolioUrl}
              onChange={handleChange}
              placeholder="https://yourportfolio.com"
            />
          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div className="profile-message profile-message--success">
            {message}
          </div>
        )}

        {error && (
          <div className="profile-message profile-message--error">{error}</div>
        )}

        {/* SUBMIT */}

        <div className="profile-form__actions">
          <button type="submit" className="profile-save-btn" disabled={loading}>
            <Save size={15} strokeWidth={1.5} />

            {loading ? "Saving..." : "Save profile"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ProfileForm;
