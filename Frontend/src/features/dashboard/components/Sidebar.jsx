import React from "react";
import {
  LayoutGrid,
  FileText,
  Brain,
  Target,
  User,
  LogOut,
  Plus,
  ChartNoAxesColumn,
} from "lucide-react";

import "../styles/Sidebar.styles.scss";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Applications", icon: FileText },
  { label: "Skills", icon: Brain },
  { label: "Goals", icon: Target },
];

export default function Sidebar({ active = "Dashboard" }) {
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
        <button type="button" className="sidebar__add-btn">
          <Plus size={17} strokeWidth={2} />
          <span>Add Application</span>
        </button>

        <div className="sidebar__divider" />

        <button type="button" className="sidebar__link">
          <User size={17} strokeWidth={1.8} />
          <span>Profile</span>
        </button>

        <button type="button" className="sidebar__link sidebar__logout">
          <LogOut size={17} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
