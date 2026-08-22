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
      <div className="sidebar__brand">
        <div className="sidebar__logo">
          <ChartNoAxesColumn size={20} color="#fff" />
        </div>
        <div>
          <div className="sidebar__title">SkillTrack</div>
          <div className="sidebar__subtitle">Career Manager</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`sidebar__link ${
              item.label === active ? "sidebar__link--active" : ""
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__add-btn">
          <Plus size={16} /> Add Application
        </button>
        <button className="sidebar__link">
          <User size={18} /> Profile
        </button>
        <button className="sidebar__link">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
