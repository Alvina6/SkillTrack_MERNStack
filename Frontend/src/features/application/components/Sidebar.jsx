import React from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutGrid,
  FileText,
  Brain,
  Target,
  User,
  LogOut,
  Plus,
} from "lucide-react";

import "../styles/Sidebar.styles.scss";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutGrid,
    path: "/dashboard",
  },
  {
    label: "Applications",
    icon: FileText,
    path: "/dashboard/Application",
  },
  {
    label: "Skills",
    icon: Brain,
    path: "/dashboard/Skills",
  },
  {
    label: "Goals",
    icon: Target,
    path: "/dashboard/Goals",
  },
];

export default function Sidebar({ active = "Dashboard" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Later we will connect your actual logout API here
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        {/* Brand */}
        <div className="sidebar__brand">
          <div className="sidebar__brand-text">
            <span className="sidebar__title">SkillTrack</span>
            <span className="sidebar__subtitle">Career Manager</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar__nav">
          <span className="sidebar__section-label">Workspace</span>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.label === active;

            return (
              <button
                key={item.label}
                type="button"
                className={`sidebar__link ${
                  isActive ? "sidebar__link--active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={17} strokeWidth={1.8} />

                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="sidebar__bottom">
        {/* Add Application */}
        <button
          type="button"
          className="sidebar__add-btn"
          onClick={() => navigate("/dashboard/Application")}
        >
          <Plus size={17} strokeWidth={2} />

          <span>Add Application</span>
        </button>

        <div className="sidebar__divider" />

        {/* Profile */}
        <button
          type="button"
          className="sidebar__link"
          onClick={() => navigate("/dashboard/Profile")}
        >
          <User size={17} strokeWidth={1.8} />

          <span>Profile</span>
        </button>

        {/* Logout */}
        <button
          type="button"
          className="sidebar__link sidebar__logout"
          onClick={handleLogout}
        >
          <LogOut size={17} strokeWidth={1.8} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
