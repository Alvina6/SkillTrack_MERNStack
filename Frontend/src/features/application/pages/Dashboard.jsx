import React from "react";

import {
  BriefcaseBusiness,
  Clock3,
  Target,
  Plus,
  ArrowUpRight,
  ChevronRight,
  Code2,
  GraduationCap,
  User,
  Mail,
  Link2,
  Globe,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import RequestError from "../components/RequestError";

import { useApplication } from "../hooks/useApplication";
import { useSkills } from "../hooks/useSkills";
import { useGoal } from "../hooks/useGoal";

import { useProfile } from "../../Profile/hook/useProfile";

import "../styles/Dashboard.styles.scss";

const Dashboard = () => {
  // =====================================================
  // API DATA
  // =====================================================

  const {
    applications = [],
    loading: applicationsLoading,
    error: applicationsError,
    clearError: clearApplicationsError,
  } = useApplication();

  const {
    skills = [],
    loading: skillsLoading,
    error: skillsError,
    clearError: clearSkillsError,
  } = useSkills();

  const {
    goals = [],
    loading: goalsLoading,
    error: goalsError,
    clearError: clearGoalsError,
  } = useGoal();

  const dataError = [applicationsError, skillsError, goalsError]
    .filter(Boolean)
    .join(" ");

  const clearDataErrors = () => {
    clearApplicationsError();
    clearSkillsError();
    clearGoalsError();
  };

  const { user, loading: profileLoading } = useProfile();

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const displayName = user?.fullName || user?.username || "User";

  const firstName = displayName.split(" ")[0];

  const headline = user?.headline || "Career Seeker";

  const targetRole = user?.targetRole || "Set your target role";

  // =====================================================
  // APPLICATION STATS
  // =====================================================

  const totalApplications = applications.length;

  const activeApplications = applications.filter(
    (application) =>
      application.status !== "Rejected" && application.status !== "Accepted",
  ).length;

  const interviewApplications = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const offerApplications = applications.filter(
    (application) => application.status === "Offer",
  ).length;

  // =====================================================
  // SKILLS
  // =====================================================

  const totalSkills = skills.length;

  // =====================================================
  // GOALS
  // =====================================================

  const totalGoals = goals.length;

  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed",
  ).length;

  const activeGoals = goals.filter(
    (goal) => goal.status === "In Progress",
  ).length;

  // =====================================================
  // APPLICATION PIPELINE
  // =====================================================

  const applicationPercentage = totalApplications > 0 ? 100 : 0;

  const interviewPercentage =
    totalApplications > 0
      ? Math.round((interviewApplications / totalApplications) * 100)
      : 0;

  const offerPercentage =
    totalApplications > 0
      ? Math.round((offerApplications / totalApplications) * 100)
      : 0;

  const overallProgress =
    totalApplications > 0
      ? Math.round(
          ((interviewApplications + offerApplications) / totalApplications) *
            100,
        )
      : 0;

  const applicationProgress = [
    {
      label: "Applications submitted",
      value: totalApplications,
      percentage: applicationPercentage,
    },
    {
      label: "Interviews",
      value: interviewApplications,
      percentage: interviewPercentage,
    },
    {
      label: "Offers",
      value: offerApplications,
      percentage: offerPercentage,
    },
  ];

  // =====================================================
  // RECENT APPLICATIONS
  // =====================================================

  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.updatedAt || 0) -
        new Date(a.createdAt || a.updatedAt || 0),
    )
    .slice(0, 3);

  // =====================================================
  // CURRENT GOAL
  // =====================================================

  const currentGoal =
    goals.find((goal) => goal.status === "In Progress") ||
    goals.find((goal) => goal.status === "Not Started") ||
    null;

  // =====================================================
  // LOADING
  // =====================================================

  const loading =
    applicationsLoading || skillsLoading || goalsLoading || profileLoading;

  // =====================================================
  // PROFILE HELPERS
  // =====================================================

  const hasProfileValue = (value) => value && value.trim() !== "";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="dashboard-page">
      {/* =================================================
          SIDEBAR
      ================================================= */}

      <Sidebar active="Dashboard" />

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="dashboard-main">
        {/* =================================================
            HEADER
        ================================================= */}

        <header className="dashboard-header">
          <div>
            <span className="eyebrow">Career overview</span>

            <h1>
              Good morning, <em>{firstName}.</em>
            </h1>

            <p>
              A clear view of your applications, skills, goals, and career
              direction.
            </p>
          </div>

          <div className="header-actions">
            <div className="profile">
              <div className="avatar">{firstName.charAt(0).toUpperCase()}</div>

              <div className="profile-info">
                <strong>{displayName}</strong>

                <span>{headline}</span>
              </div>
            </div>
          </div>
        </header>

        <RequestError message={dataError} onDismiss={clearDataErrors} />

        {/* =================================================
            STATS
        ================================================= */}

        <section className="stats-grid">
          {/* APPLICATIONS */}

          <article className="stat-card">
            <div className="stat-top">
              <span>Applications</span>

              <BriefcaseBusiness size={17} strokeWidth={1.6} />
            </div>

            <div className="stat-value">
              {loading ? "—" : totalApplications}
            </div>

            <p>Total applications</p>
          </article>

          {/* ACTIVE */}

          <article className="stat-card">
            <div className="stat-top">
              <span>Active</span>

              <Clock3 size={17} strokeWidth={1.6} />
            </div>

            <div className="stat-value">
              {loading ? "—" : activeApplications}
            </div>

            <p>Currently in progress</p>
          </article>

          {/* SKILLS */}

          <article className="stat-card">
            <div className="stat-top">
              <span>Skills</span>

              <Code2 size={17} strokeWidth={1.6} />
            </div>

            <div className="stat-value">{loading ? "—" : totalSkills}</div>

            <p>Skills tracked</p>
          </article>

          {/* GOALS */}

          <article className="stat-card">
            <div className="stat-top">
              <span>Goals</span>

              <Target size={17} strokeWidth={1.6} />
            </div>

            <div className="stat-value">{loading ? "—" : totalGoals}</div>

            <p>{completedGoals} completed</p>
          </article>
        </section>

        {/* =================================================
            APPLICATION + QUICK ACTIONS
        ================================================= */}

        <section className="content-grid">
          {/* APPLICATION PIPELINE */}

          <article className="card progress-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Applications</span>

                <h2>Application pipeline</h2>

                <p>Your current movement from application to offer.</p>
              </div>

              <button
                type="button"
                className="text-button"
                onClick={() =>
                  (window.location.href = "/dashboard/Application")
                }
              >
                View all
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="pipeline">
              <div className="pipeline-score">
                <span>Overall progress</span>

                <strong>
                  {loading ? "—" : overallProgress}

                  {!loading && <span>%</span>}
                </strong>

                <small>Across applications</small>
              </div>

              <div className="progress-details">
                {applicationProgress.map((item) => (
                  <div className="progress-item" key={item.label}>
                    <div className="progress-label">
                      <span>{item.label}</span>

                      <strong>{String(item.value).padStart(2, "0")}</strong>
                    </div>

                    <div className="progress-bar">
                      <div
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* QUICK ACTIONS */}

          <article className="card quick-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Workspace</span>

                <h2>Quick actions</h2>

                <p>Keep your career tracker up to date.</p>
              </div>
            </div>

            <div className="quick-actions">
              {/* ADD APPLICATION */}

              <button
                type="button"
                onClick={() =>
                  (window.location.href = "/dashboard/Application")
                }
              >
                <span className="action-icon">
                  <Plus size={17} />
                </span>

                <span className="action-copy">
                  <strong>Add application</strong>

                  <small>Track a new opportunity</small>
                </span>

                <ChevronRight size={15} />
              </button>

              {/* SKILLS */}

              <button
                type="button"
                onClick={() => (window.location.href = "/dashboard/Skills")}
              >
                <span className="action-icon">
                  <Code2 size={17} />
                </span>

                <span className="action-copy">
                  <strong>Manage skills</strong>

                  <small>Update your professional profile</small>
                </span>

                <ChevronRight size={15} />
              </button>

              {/* GOALS */}

              <button
                type="button"
                onClick={() => (window.location.href = "/dashboard/Goals")}
              >
                <span className="action-icon">
                  <Target size={17} />
                </span>

                <span className="action-copy">
                  <strong>Manage goals</strong>

                  <small>Define your next milestone</small>
                </span>

                <ChevronRight size={15} />
              </button>
            </div>
          </article>
        </section>

        {/* =================================================
            RECENT APPLICATIONS
        ================================================= */}

        <section className="card activity-card">
          <div className="card-header">
            <div>
              <span className="card-eyebrow">Activity</span>

              <h2>Recent applications</h2>

              <p>Your latest career activity.</p>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => (window.location.href = "/dashboard/Application")}
            >
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="application-table">
            <div className="table-header">
              <span>Role</span>

              <span>Company</span>

              <span>Location</span>

              <span>Status</span>

              <span>Date</span>
            </div>

            {recentApplications.length === 0 ? (
              <div className="application-row empty">
                <span>No applications yet.</span>
              </div>
            ) : (
              recentApplications.map((application) => {
                const statusClass = application.status
                  ?.toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <div
                    className="application-row"
                    key={application._id || application.id}
                  >
                    <strong>
                      {application.position || application.jobTitle || "—"}
                    </strong>

                    <span>{application.company || "—"}</span>

                    <span>{application.location || "—"}</span>

                    <span className={`status ${statusClass}`}>
                      {application.status || "—"}
                    </span>

                    <time>
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "—"}
                    </time>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* =================================================
            CAREER + GOAL
        ================================================= */}

        <section className="bottom-grid">
          {/* CAREER FOCUS */}

          <article className="card focus-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Direction</span>

                <h2>Career focus</h2>
              </div>
            </div>

            <div className="focus-content">
              <div className="focus-icon">
                <Code2 size={20} strokeWidth={1.6} />
              </div>

              <div>
                <strong>{targetRole}</strong>

                <p>Your current target role and professional direction.</p>

                <button
                  type="button"
                  className="inline-link"
                  onClick={() => (window.location.href = "/dashboard/Profile")}
                >
                  Edit profile
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </article>

          {/* CURRENT GOAL */}

          <article className="card goal-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Next milestone</span>

                <h2>Current goal</h2>
              </div>
            </div>

            {currentGoal ? (
              <div className="goal-content">
                <div className="goal-icon">
                  <GraduationCap size={20} strokeWidth={1.6} />
                </div>

                <div className="goal-info">
                  <strong>{currentGoal.title}</strong>

                  <div className="goal-meta">
                    <span>Status</span>

                    <strong>{currentGoal.status}</strong>
                  </div>

                  <div className="goal-bar">
                    <div
                      style={{
                        width:
                          currentGoal.status === "Completed"
                            ? "100%"
                            : currentGoal.status === "In Progress"
                              ? "50%"
                              : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="goal-content">
                <div className="goal-icon">
                  <GraduationCap size={20} strokeWidth={1.6} />
                </div>

                <div className="goal-info">
                  <strong>No active goal</strong>

                  <p>Create a goal to track your next milestone.</p>
                </div>
              </div>
            )}
          </article>
        </section>

        {/* =================================================
            PROFILE SNAPSHOT
        ================================================= */}

        <section className="card profile-snapshot">
          <div className="card-header">
            <div>
              <span className="card-eyebrow">Account</span>

              <h2>Profile information</h2>

              <p>
                Your professional information currently stored in SkillTrack.
              </p>
            </div>

            <button
              type="button"
              className="text-button"
              onClick={() => (window.location.href = "/dashboard/Profile")}
            >
              Edit profile
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="profile-details-grid">
            {/* USERNAME */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <User size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Username</span>

                <strong>{user?.username || "—"}</strong>
              </div>
            </div>

            {/* EMAIL */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <Mail size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Email</span>

                <strong>{user?.email || "—"}</strong>
              </div>
            </div>

            {/* FULL NAME */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <User size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Full Name</span>

                <strong>{user?.fullName || "—"}</strong>
              </div>
            </div>

            {/* HEADLINE */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <BriefcaseBusiness size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Headline</span>

                <strong>{user?.headline || "—"}</strong>
              </div>
            </div>

            {/* TARGET ROLE */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <Target size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Target Role</span>

                <strong>{user?.targetRole || "—"}</strong>
              </div>
            </div>

            {/* BIO */}

            <div className="profile-detail profile-detail-full">
              <div className="profile-detail-icon">
                <User size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Bio</span>

                <strong>{user?.bio || "—"}</strong>
              </div>
            </div>

            {/* LINKEDIN */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <Link2 size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>LinkedIn</span>

                {hasProfileValue(user?.linkedinUrl) ? (
                  <a href={user.linkedinUrl} target="_blank" rel="noreferrer">
                    {user.linkedinUrl}
                  </a>
                ) : (
                  <strong>—</strong>
                )}
              </div>
            </div>

            {/* GITHUB */}

            <div className="profile-detail">
              <div className="profile-detail-icon">
                <Code2 size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>GitHub</span>

                {hasProfileValue(user?.githubUrl) ? (
                  <a href={user.githubUrl} target="_blank" rel="noreferrer">
                    {user.githubUrl}
                  </a>
                ) : (
                  <strong>—</strong>
                )}
              </div>
            </div>

            {/* PORTFOLIO */}

            <div className="profile-detail profile-detail-full">
              <div className="profile-detail-icon">
                <Globe size={16} strokeWidth={1.6} />
              </div>

              <div>
                <span>Portfolio</span>

                {hasProfileValue(user?.portfolioUrl) ? (
                  <a href={user.portfolioUrl} target="_blank" rel="noreferrer">
                    {user.portfolioUrl}
                  </a>
                ) : (
                  <strong>—</strong>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
