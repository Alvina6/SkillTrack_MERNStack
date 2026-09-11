import React, { useMemo, useState } from "react";

import { ArrowUpRight, Code2, Edit3, Plus, Search, Trash2 } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { useSkills } from "../hooks/useSkills";

import "../styles/Skills.styles.scss";

const Skills = () => {
  const { skills, loading, addSkill, editSkill, deleteSkill } = useSkills();

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "Beginner",
  });

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) =>
      skill.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [skills, search]);

  const totalSkills = skills.length;

  const beginnerCount = skills.filter(
    (skill) => skill.level === "Beginner",
  ).length;

  const intermediateCount = skills.filter(
    (skill) => skill.level === "Intermediate",
  ).length;

  const advancedCount = skills.filter(
    (skill) => skill.level === "Advanced",
  ).length;

  const openAddForm = () => {
    setEditingSkill(null);

    setFormData({
      name: "",
      level: "Beginner",
    });

    setShowForm(true);
  };

  const openEditForm = (skill) => {
    setEditingSkill(skill);

    setFormData({
      name: skill.name || "",
      level: skill.level || "Beginner",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSkill(null);

    setFormData({
      name: "",
      level: "Beginner",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return;

    if (editingSkill) {
      await editSkill(editingSkill._id, formData);
    } else {
      await addSkill(formData);
    }

    closeForm();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?",
    );

    if (!confirmed) return;

    await deleteSkill(id);
  };

  return (
    <div className="skills-page">
      <Sidebar active="Skills" />

      <main className="skills-main">
        {/* HEADER */}

        <header className="skills-header">
          <div className="skills-heading">
            <span className="eyebrow">Professional development</span>

            <h1>
              Your <em>skills.</em>
            </h1>

            <p>
              Keep your capabilities current and track the areas you are
              building for your next opportunity.
            </p>
          </div>

          <button type="button" className="add-skill-btn" onClick={openAddForm}>
            <Plus size={16} strokeWidth={1.7} />
            Add skill
          </button>
        </header>

        {/* STATS */}

        <section className="skills-stats">
          <article className="skill-stat">
            <span>Total skills</span>
            <strong>{totalSkills}</strong>
          </article>

          <article className="skill-stat">
            <span>Beginner</span>
            <strong>{beginnerCount}</strong>
          </article>

          <article className="skill-stat">
            <span>Intermediate</span>
            <strong>{intermediateCount}</strong>
          </article>

          <article className="skill-stat">
            <span>Advanced</span>
            <strong>{advancedCount}</strong>
          </article>
        </section>

        {/* SEARCH */}

        <section className="skills-toolbar">
          <div className="skills-search">
            <Search size={16} strokeWidth={1.5} />

            <input
              type="text"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <span className="skills-count">
            {filteredSkills.length}{" "}
            {filteredSkills.length === 1 ? "skill" : "skills"}
          </span>
        </section>

        {/* SKILLS */}

        <section className="skills-card">
          <div className="card-heading">
            <div>
              <span className="card-eyebrow">Capability tracker</span>

              <h2>All skills</h2>

              <p>Your current technical and professional capabilities.</p>
            </div>
          </div>

          {loading ? (
            <div className="skills-loading">Loading your skills...</div>
          ) : filteredSkills.length === 0 ? (
            <div className="skills-empty">
              <div className="empty-icon">
                <Code2 size={20} strokeWidth={1.5} />
              </div>

              <h3>{search ? "No matching skills" : "No skills added yet"}</h3>

              <p>
                {search
                  ? "Try a different search term."
                  : "Start building your professional profile by adding your first skill."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openAddForm}
                  className="empty-action"
                >
                  <Plus size={15} />
                  Add your first skill
                </button>
              )}
            </div>
          ) : (
            <div className="skills-list">
              <div className="skills-list-header">
                <span>Skill</span>
                <span>Level</span>
                <span>Actions</span>
              </div>

              {filteredSkills.map((skill) => (
                <div className="skill-row" key={skill._id}>
                  <div className="skill-name">
                    <div className="skill-icon">
                      <Code2 size={17} strokeWidth={1.5} />
                    </div>

                    <div>
                      <strong>{skill.name}</strong>

                      <small>Professional capability</small>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`skill-level ${skill.level
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <div className="skill-actions">
                    <button
                      type="button"
                      onClick={() => openEditForm(skill)}
                      aria-label={`Edit ${skill.name}`}
                    >
                      <Edit3 size={15} strokeWidth={1.5} />
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(skill._id)}
                      aria-label={`Delete ${skill.name}`}
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DEVELOPMENT NOTE */}

        {skills.length > 0 && (
          <section className="skills-note">
            <div>
              <span className="card-eyebrow">Keep developing</span>

              <h3>Build depth where it matters.</h3>

              <p>
                Focus on the skills most relevant to your target roles and
                support them with practical projects.
              </p>
            </div>

            <button type="button">
              View goals
              <ArrowUpRight size={14} />
            </button>
          </section>
        )}
      </main>

      {/* ADD / EDIT MODAL */}

      {showForm && (
        <div
          className="skill-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="skill-modal">
            <div className="modal-header">
              <div>
                <span className="card-eyebrow">
                  {editingSkill ? "Update capability" : "New capability"}
                </span>

                <h2>{editingSkill ? "Edit skill" : "Add a skill"}</h2>

                <p>Keep your professional profile accurate and current.</p>
              </div>

              <button type="button" onClick={closeForm} className="modal-close">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Skill name
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. React.js"
                  value={formData.name}
                  onChange={handleChange}
                  autoFocus
                />
              </label>

              <label>
                Proficiency level
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>

                  <option value="Intermediate">Intermediate</option>

                  <option value="Advanced">Advanced</option>
                </select>
              </label>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingSkill ? "Save changes" : "Add skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
