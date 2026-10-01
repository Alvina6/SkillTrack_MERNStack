import React, { useEffect, useState } from "react";

import { BriefcaseBusiness, Mail, User } from "lucide-react";

import Sidebar from "../../application/components/Sidebar";

import ProfileForm from "../components/ProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";

import { getMeAPI } from "../services/profile.api";

import "../styles/Profile.styles.scss";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMeAPI();

        setUser(response.user);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Sidebar active="Profile" />

        <main className="profile-main">
          <div className="profile-loading">Loading profile...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Sidebar active="Profile" />

      <main className="profile-main">
        {/* =========================
            PAGE HEADER
        ========================= */}

        <header className="profile-header">
          <div className="profile-heading">
            <span className="profile-eyebrow">Account</span>

            <h1>
              Your <em>profile.</em>
            </h1>

            <p>Manage your professional identity and account information.</p>
          </div>
        </header>

        {/* =========================
            PROFILE SUMMARY
        ========================= */}

        <section className="profile-summary">
          <div className="profile-avatar">
            {user?.fullName
              ? user.fullName.charAt(0).toUpperCase()
              : user?.username
                ? user.username.charAt(0).toUpperCase()
                : "U"}
          </div>

          <div className="profile-summary__content">
            <h2>{user?.fullName || user?.username || "Your Name"}</h2>

            <p>{user?.headline || "Add a professional headline"}</p>

            <div className="profile-summary__meta">
              <span>
                <Mail size={13} strokeWidth={1.5} />

                {user?.email}
              </span>

              {user?.targetRole && (
                <span>
                  <BriefcaseBusiness size={13} strokeWidth={1.5} />

                  {user.targetRole}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* =========================
            PROFILE FORM
        ========================= */}

        {user && (
          <ProfileForm user={user} onProfileUpdated={handleProfileUpdated} />
        )}

        {/* =========================
            PASSWORD
        ========================= */}

        <ChangePasswordForm />
      </main>
    </div>
  );
};

export default Profile;
