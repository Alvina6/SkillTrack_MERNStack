import React, { useMemo, useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Edit3,
  Plus,
  Search,
  Target,
  Trash2,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import RequestError from "../components/RequestError";
import { useGoal } from "../hooks/useGoal";

import "../styles/Goals.styles.scss";

const Goals = () => {
  const { goals, loading, error, clearError, addGoal, editGoal, removeGoal } =
    useGoal();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Not Started",
    deadline: "",
  });

  /* =========================
     FILTER GOALS
  ========================= */

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        goal.title?.toLowerCase().includes(searchText) ||
        goal.description?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || goal.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [goals, search, statusFilter]);

  /* =========================
     STATS
  ========================= */

  const totalGoals = goals.length;

  const notStartedGoals = goals.filter(
    (goal) => goal.status === "Not Started",
  ).length;

  const inProgressGoals = goals.filter(
    (goal) => goal.status === "In Progress",
  ).length;

  const completedGoals = goals.filter(
    (goal) => goal.status === "Completed",
  ).length;

  /* =========================
     OPEN ADD FORM
  ========================= */

  const openAddForm = () => {
    setEditingGoal(null);

    setFormData({
      title: "",
      description: "",
      status: "Not Started",
      deadline: "",
    });

    setShowForm(true);
  };

  /* =========================
     OPEN EDIT FORM
  ========================= */

  const openEditForm = (goal) => {
    setEditingGoal(goal);

    setFormData({
      title: goal.title || "",
      description: goal.description || "",
      status: goal.status || "Not Started",
      deadline: goal.deadline ? goal.deadline.substring(0, 10) : "",
    });

    setShowForm(true);
  };

  /* =========================
     CLOSE FORM
  ========================= */

  const closeForm = () => {
    setShowForm(false);
    setEditingGoal(null);

    setFormData({
      title: "",
      description: "",
      status: "Not Started",
      deadline: "",
    });
  };

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return;
    }

    let saved;
    if (editingGoal) {
      saved = await editGoal(editingGoal._id, formData);
    } else {
      saved = await addGoal(formData);
    }

    if (saved) closeForm();
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?",
    );

    if (!confirmed) return;

    await removeGoal(id);
  };

  /* =========================
     DATE FORMAT
  ========================= */

  const formatDeadline = (deadline) => {
    if (!deadline) {
      return "No deadline";
    }

    return new Date(deadline).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =========================
     OVERDUE
  ========================= */

  const isOverdue = (goal) => {
    if (!goal.deadline) {
      return false;
    }

    if (goal.status === "Completed") {
      return false;
    }

    return new Date(goal.deadline) < new Date();
  };

  return (
    <div className="goals-page">
      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar active="Goals" />

      {/* =========================
          MAIN
      ========================= */}

      <main className="goals-main">
        {/* =========================
            HEADER
        ========================= */}

        <header className="goals-header">
          <div className="goals-heading">
            <span className="eyebrow">Professional direction</span>

            <h1>
              Your <em>goals.</em>
            </h1>

            <p>
              Define the milestones that move your career forward and keep track
              of the work behind them.
            </p>
          </div>

          <button type="button" className="add-goal-btn" onClick={openAddForm}>
            <Plus size={16} strokeWidth={1.7} />
            Add goal
          </button>
        </header>

        <RequestError message={error} onDismiss={clearError} />

        {/* =========================
            STATS
        ========================= */}

        <section className="goals-stats">
          <article className="goal-stat">
            <span>Total goals</span>
            <strong>{totalGoals}</strong>
          </article>

          <article className="goal-stat">
            <span>Not started</span>
            <strong>{notStartedGoals}</strong>
          </article>

          <article className="goal-stat">
            <span>In progress</span>
            <strong>{inProgressGoals}</strong>
          </article>

          <article className="goal-stat">
            <span>Completed</span>
            <strong>{completedGoals}</strong>
          </article>
        </section>

        {/* =========================
            TOOLBAR
        ========================= */}

        <section className="goals-toolbar">
          <div className="goals-search">
            <Search size={16} strokeWidth={1.5} />

            <input
              type="text"
              placeholder="Search goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="goal-filters">
            {["All", "Not Started", "In Progress", "Completed"].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  className={statusFilter === status ? "filter-active" : ""}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ),
            )}
          </div>
        </section>

        {/* =========================
            GOALS CARD
        ========================= */}

        <section className="goals-card">
          <div className="card-heading">
            <div>
              <span className="card-eyebrow">Milestone tracker</span>

              <h2>All goals</h2>

              <p>Your current career and development milestones.</p>
            </div>

            <span className="goal-results">
              {filteredGoals.length}{" "}
              {filteredGoals.length === 1 ? "goal" : "goals"}
            </span>
          </div>

          {/* =========================
              LOADING
          ========================= */}

          {loading ? (
            <div className="goals-loading">Loading your goals...</div>
          ) : filteredGoals.length === 0 ? (
            /* =========================
               EMPTY STATE
            ========================= */

            <div className="goals-empty">
              <div className="empty-icon">
                <Target size={20} strokeWidth={1.5} />
              </div>

              <h3>
                {search || statusFilter !== "All"
                  ? "No matching goals"
                  : "No goals added yet"}
              </h3>

              <p>
                {search || statusFilter !== "All"
                  ? "Try changing your search or filter."
                  : "Create your first milestone and start tracking your progress."}
              </p>

              {!search && statusFilter === "All" && (
                <button
                  type="button"
                  className="empty-action"
                  onClick={openAddForm}
                >
                  <Plus size={15} />
                  Create your first goal
                </button>
              )}
            </div>
          ) : (
            /* =========================
               GOAL LIST
            ========================= */

            <div className="goals-list">
              {filteredGoals.map((goal) => {
                const overdue = isOverdue(goal);

                return (
                  <article className="goal-item" key={goal._id}>
                    {/* LEFT */}

                    <div className="goal-item-main">
                      <div className="goal-item-icon">
                        {goal.status === "Completed" ? (
                          <CheckCircle2 size={18} strokeWidth={1.5} />
                        ) : (
                          <Target size={18} strokeWidth={1.5} />
                        )}
                      </div>

                      <div className="goal-item-content">
                        <div className="goal-title-row">
                          <h3>{goal.title}</h3>

                          <span
                            className={`goal-status ${goal.status
                              ?.toLowerCase()
                              .replace(/\s+/g, "-")}`}
                          >
                            {goal.status}
                          </span>
                        </div>

                        {goal.description && <p>{goal.description}</p>}

                        <div className="goal-meta">
                          <span className={overdue ? "deadline-overdue" : ""}>
                            <CalendarDays size={13} strokeWidth={1.5} />

                            {overdue ? "Overdue · " : "Deadline · "}

                            {formatDeadline(goal.deadline)}
                          </span>

                          <span>
                            <Clock3 size={13} strokeWidth={1.5} />

                            {goal.status === "Completed"
                              ? "Milestone reached"
                              : goal.status === "In Progress"
                                ? "Currently in progress"
                                : "Not started yet"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT */}

                    <div className="goal-item-actions">
                      <button
                        type="button"
                        onClick={() => openEditForm(goal)}
                        aria-label={`Edit ${goal.title}`}
                      >
                        <Edit3 size={15} strokeWidth={1.5} />
                      </button>

                      <button
                        type="button"
                        className="delete-goal"
                        onClick={() => handleDelete(goal._id)}
                        aria-label={`Delete ${goal.title}`}
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* =========================
            CAREER NOTE
        ========================= */}

        {goals.length > 0 && (
          <section className="goals-note">
            <div>
              <span className="card-eyebrow">Career planning</span>

              <h3>Small milestones create visible progress.</h3>

              <p>
                Keep your goals specific and connected to the roles, skills, and
                opportunities you want next.
              </p>
            </div>

            <button type="button">
              Review skills
              <ArrowUpRight size={14} />
            </button>
          </section>
        )}
      </main>

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showForm && (
        <div
          className="goal-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeForm();
            }
          }}
        >
          <div className="goal-modal">
            {/* MODAL HEADER */}

            <div className="modal-header">
              <div>
                <span className="card-eyebrow">
                  {editingGoal ? "Update milestone" : "New milestone"}
                </span>

                <h2>{editingGoal ? "Edit goal" : "Create a goal"}</h2>

                <p>
                  Define a clear milestone for your professional development.
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeForm}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>
              {/* TITLE */}

              <label>
                Goal title
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Secure a software internship"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>

              {/* DESCRIPTION */}

              <label>
                Description
                <textarea
                  name="description"
                  placeholder="Describe what you want to achieve..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </label>

              {/* STATUS + DEADLINE */}

              <div className="form-row">
                <label>
                  Status
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Not Started">Not Started</option>

                    <option value="In Progress">In Progress</option>

                    <option value="Completed">Completed</option>
                  </select>
                </label>

                <label>
                  Deadline
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* ACTIONS */}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingGoal ? "Save changes" : "Create goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;
