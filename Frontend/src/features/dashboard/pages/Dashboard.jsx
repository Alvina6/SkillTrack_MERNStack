import React from "react";

import {
  Bell,
  BriefcaseBusiness,
  Clock3,
  Target,
  Plus,
  ArrowUpRight,
  ChevronRight,
  Code2,
  GraduationCap,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.styles.scss";

const stats = [
  {
    label: "Applications",
    value: "18",
    description: "+4 this month",
    icon: BriefcaseBusiness,
  },
  {
    label: "Active",
    value: "6",
    description: "Currently in progress",
    icon: Clock3,
  },
  {
    label: "Skills",
    value: "14",
    description: "+3 recently",
    icon: Code2,
  },
  {
    label: "Goals",
    value: "5",
    description: "2 completed",
    icon: Target,
  },
];

const applicationProgress = [
  {
    label: "Applications submitted",
    value: 18,
    percentage: 90,
  },
  {
    label: "Interviews",
    value: 6,
    percentage: 60,
  },
  {
    label: "Offers",
    value: 2,
    percentage: 30,
  },
];

const recentApplications = [
  {
    company: "Tech Solutions",
    position: "Frontend Developer",
    location: "Karachi",
    status: "Interview",
    statusClass: "interview",
    date: "2 days ago",
  },
  {
    company: "Systems Ltd",
    position: "Software Engineer",
    location: "Karachi",
    status: "Applied",
    statusClass: "applied",
    date: "4 days ago",
  },
  {
    company: "Digital Labs",
    position: "MERN Stack Developer",
    location: "Remote",
    status: "In Review",
    statusClass: "review",
    date: "1 week ago",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar active="Dashboard" />

      <main className="dashboard-main">
        {/* ================= HEADER ================= */}

        <header className="dashboard-header">
          <div>
            <span className="eyebrow">Career overview</span>

            <h1>
              Good morning, <em>Alvina.</em>
            </h1>

            <p>
              A clear view of your applications, skills, and next career moves.
            </p>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="notification-btn"
              aria-label="Notifications"
            >
              <Bell size={18} strokeWidth={1.7} />
              <span />
            </button>

            <div className="profile">
              <div className="avatar">A</div>

              <div className="profile-info">
                <strong>Alvina Rahim</strong>
                <span>Career Seeker</span>
              </div>
            </div>
          </div>
        </header>

        {/* ================= STATS ================= */}

        <section className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="stat-card" key={stat.label}>
                <div className="stat-top">
                  <span>{stat.label}</span>

                  <Icon size={17} strokeWidth={1.6} />
                </div>

                <div className="stat-value">{stat.value}</div>

                <p>{stat.description}</p>
              </article>
            );
          })}
        </section>

        {/* ================= MAIN GRID ================= */}

        <section className="content-grid">
          {/* Application overview */}

          <article className="card progress-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Applications</span>

                <h2>Application pipeline</h2>

                <p>Your current movement from application to offer.</p>
              </div>

              <button type="button" className="text-button">
                View all
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="pipeline">
              <div className="pipeline-score">
                <span>Overall progress</span>

                <strong>
                  72<span>%</span>
                </strong>

                <small>Across active applications</small>
              </div>

              <div className="progress-details">
                {applicationProgress.map((item) => (
                  <div className="progress-item" key={item.label}>
                    <div className="progress-label">
                      <span>{item.label}</span>
                      <strong>{String(item.value).padStart(2, "0")}</strong>
                    </div>

                    <div className="progress-bar">
                      <div style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Quick actions */}

          <article className="card quick-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Workspace</span>

                <h2>Quick actions</h2>

                <p>Keep your career tracker up to date.</p>
              </div>
            </div>

            <div className="quick-actions">
              <button type="button">
                <span className="action-icon">
                  <Plus size={17} />
                </span>

                <span className="action-copy">
                  <strong>Add application</strong>
                  <small>Track a new opportunity</small>
                </span>

                <ChevronRight size={15} />
              </button>

              <button type="button">
                <span className="action-icon">
                  <Code2 size={17} />
                </span>

                <span className="action-copy">
                  <strong>Manage skills</strong>
                  <small>Update your professional profile</small>
                </span>

                <ChevronRight size={15} />
              </button>

              <button type="button">
                <span className="action-icon">
                  <Target size={17} />
                </span>

                <span className="action-copy">
                  <strong>Create goal</strong>
                  <small>Define your next milestone</small>
                </span>

                <ChevronRight size={15} />
              </button>
            </div>
          </article>
        </section>

        {/* ================= RECENT APPLICATIONS ================= */}

        <section className="card activity-card">
          <div className="card-header">
            <div>
              <span className="card-eyebrow">Activity</span>

              <h2>Recent applications</h2>

              <p>Your latest career activity.</p>
            </div>

            <button type="button" className="text-button">
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
              <span>Updated</span>
            </div>

            {recentApplications.map((application) => (
              <div
                className="application-row"
                key={`${application.company}-${application.position}`}
              >
                <strong>{application.position}</strong>

                <span>{application.company}</span>

                <span>{application.location}</span>

                <span className={`status ${application.statusClass}`}>
                  {application.status}
                </span>

                <time>{application.date}</time>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CAREER GRID ================= */}

        <section className="bottom-grid">
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
                <strong>MERN Stack Development</strong>

                <p>
                  Strengthen your full-stack fundamentals through practical
                  projects and relevant industry experience.
                </p>

                <button type="button" className="inline-link">
                  View skills
                  <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </article>

          <article className="card goal-card">
            <div className="card-header">
              <div>
                <span className="card-eyebrow">Next milestone</span>

                <h2>Current goal</h2>
              </div>
            </div>

            <div className="goal-content">
              <div className="goal-icon">
                <GraduationCap size={20} strokeWidth={1.6} />
              </div>

              <div className="goal-info">
                <strong>Secure a Software Internship</strong>

                <div className="goal-meta">
                  <span>Progress</span>
                  <strong>65%</strong>
                </div>

                <div className="goal-bar">
                  <div style={{ width: "65%" }} />
                </div>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
