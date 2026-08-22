import React from "react";
import {
  Bell,
  BriefcaseBusiness,
  CheckCircle2,
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
    label: "Total Applications",
    value: "18",
    description: "+4 this month",
    type: "purple",
    icon: BriefcaseBusiness,
    positive: true,
  },
  {
    label: "Active Applications",
    value: "6",
    description: "Currently in progress",
    type: "blue",
    icon: Clock3,
  },
  {
    label: "Skills",
    value: "14",
    description: "+3 added recently",
    type: "green",
    icon: Code2,
    positive: true,
  },
  {
    label: "Career Goals",
    value: "5",
    description: "2 completed",
    type: "orange",
    icon: Target,
  },
];

const applicationProgress = [
  {
    label: "Applications Submitted",
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
    statusClass: "status-interview",
    date: "2 days ago",
    icon: "T",
    iconClass: "purple",
  },
  {
    company: "Systems Ltd",
    position: "Software Engineer",
    location: "Karachi",
    status: "Applied",
    statusClass: "status-applied",
    date: "4 days ago",
    icon: "S",
    iconClass: "blue",
  },
  {
    company: "Digital Labs",
    position: "MERN Stack Developer",
    location: "Remote",
    status: "In Review",
    statusClass: "status-review",
    date: "1 week ago",
    icon: "D",
    iconClass: "green",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <Sidebar active="Dashboard" />

      <main className="dashboard-main">
        {/* ================= HEADER ================= */}

        <header className="dashboard-header">
          <div className="dashboard-heading">
            <h1>Dashboard</h1>
            <p>Keep track of your applications, skills, and career goals.</p>
          </div>

          <div className="header-actions">
            <button
              className="notification-btn"
              type="button"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="notification-dot" />
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

        {/* ================= STAT CARDS ================= */}

        <section className="stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="stat-card" key={stat.label}>
                <div className={`stat-icon ${stat.type}`}>
                  <Icon size={20} />
                </div>

                <div className="stat-content">
                  <p>{stat.label}</p>

                  <h2>{stat.value}</h2>

                  <span className={stat.positive ? "positive" : ""}>
                    {stat.description}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* ================= MAIN GRID ================= */}

        <section className="content-grid">
          {/* APPLICATION OVERVIEW */}

          <div className="card progress-card">
            <div className="card-header">
              <div>
                <h3>Application Overview</h3>
                <p>Track your job application progress.</p>
              </div>

              <button type="button">
                View Applications
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="progress-content">
              {/* Progress Circle */}

              <div className="progress-circle">
                <div>
                  <strong>72%</strong>
                  <span>Progress</span>
                </div>
              </div>

              {/* Progress Details */}

              <div className="progress-details">
                {applicationProgress.map((item) => (
                  <div className="progress-item" key={item.label}>
                    <div className="progress-label">
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
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
          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="card quick-card">
            <div className="card-header">
              <div>
                <h3>Quick Actions</h3>
                <p>Manage your career journey.</p>
              </div>
            </div>

            <div className="quick-actions">
              <button type="button">
                <span className="action-icon purple">
                  <Plus size={18} />
                </span>

                <div>
                  <strong>Add Application</strong>
                  <small>Track a new job application</small>
                </div>

                <ChevronRight size={16} />
              </button>

              <button type="button">
                <span className="action-icon blue">
                  <Code2 size={17} />
                </span>

                <div>
                  <strong>Manage Skills</strong>
                  <small>Update your professional skills</small>
                </div>

                <ChevronRight size={16} />
              </button>

              <button type="button">
                <span className="action-icon green">
                  <Target size={17} />
                </span>

                <div>
                  <strong>Create Goal</strong>
                  <small>Set a new career objective</small>
                </div>

                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ================= RECENT APPLICATIONS ================= */}

        <section className="card activity-card">
          <div className="card-header">
            <div>
              <h3>Recent Applications</h3>
              <p>Your latest job application activity.</p>
            </div>

            <button type="button">
              View All
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="activity-list">
            {recentApplications.map((application) => (
              <div
                className="activity-item"
                key={`${application.company}-${application.position}`}
              >
                <div className={`activity-icon ${application.iconClass}`}>
                  {application.icon}
                </div>

                <div className="activity-info">
                  <strong>{application.position}</strong>

                  <p>
                    {application.company}
                    <span className="separator">·</span>
                    {application.location}
                  </p>
                </div>

                <span className={`status ${application.statusClass}`}>
                  {application.status}
                </span>

                <span className="activity-time">{application.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CAREER FOCUS ================= */}

        <section className="bottom-grid">
          <div className="card focus-card">
            <div className="card-header">
              <div>
                <h3>Career Focus</h3>
                <p>Your current professional direction.</p>
              </div>
            </div>

            <div className="focus-content">
              <div className="focus-icon">
                <Code2 size={20} />
              </div>

              <div>
                <strong>MERN Stack Development</strong>
                <p>
                  Focus on improving your full-stack development skills and
                  building relevant experience.
                </p>
              </div>
            </div>
          </div>

          <div className="card goal-card">
            <div className="card-header">
              <div>
                <h3>Current Goal</h3>
                <p>Your next career milestone.</p>
              </div>
            </div>

            <div className="goal-content">
              <div className="goal-icon">
                <GraduationCap size={20} />
              </div>

              <div className="goal-info">
                <strong>Secure a Software Internship</strong>

                <div className="goal-progress">
                  <div>
                    <span>Progress</span>
                    <strong>65%</strong>
                  </div>

                  <div className="goal-bar">
                    <div style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
