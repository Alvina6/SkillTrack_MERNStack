import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Pencil,
  Trash2,
  ExternalLink,
  BriefcaseBusiness,
  MapPin,
  X,
  LoaderCircle,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import RequestError from "../components/RequestError";
import { useApplication } from "../hooks/useApplication";

import "../styles/Applications.styles.scss";

const STATUS_OPTIONS = [
  "All",
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

const EMPTY_FORM = {
  company: "",
  position: "",
  jobTitle: "",
  location: "",
  status: "Applied",
  jobURL: "",
  notes: "",
};

const Applications = () => {
  const {
    applications,
    loading,
    error,
    clearError,
    addApplication,
    editApplication,
    removeApplication,
  } = useApplication();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        application.company?.toLowerCase().includes(searchValue) ||
        application.position?.toLowerCase().includes(searchValue) ||
        application.jobTitle?.toLowerCase().includes(searchValue) ||
        application.location?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const handleOpenCreate = () => {
    setEditingApplication(null);
    setShowForm(true);
  };

  const handleOpenEdit = (application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  const handleSubmit = async (formData) => {
    let saved;

    if (editingApplication) {
      saved = await editApplication(editingApplication._id, formData);
    } else {
      saved = await addApplication(formData);
    }

    if (saved) handleCloseForm();
    return saved;
  };

  const handleOpenDelete = (application) => {
    setDeleteTarget(application);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    const removed = await removeApplication(deleteTarget._id);
    if (!removed) return;

    setDeleteTarget(null);
    setShowDelete(false);
  };

  const getStatusClass = (status) => {
    return status?.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="applications-page">
      <Sidebar active="Applications" />

      <main className="applications-main">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="applications-header">
          <div>
            <span className="applications-eyebrow">Career workspace</span>

            <h1>
              Your <em>applications.</em>
            </h1>

            <p>
              Keep every opportunity organized from first application to final
              decision.
            </p>
          </div>

          <button
            type="button"
            className="applications-add-btn"
            onClick={handleOpenCreate}
          >
            <Plus size={16} strokeWidth={1.5} />
            Add application
          </button>
        </header>

        <RequestError message={error} onDismiss={clearError} />

        {/* =====================================================
            SUMMARY
        ===================================================== */}

        <section className="applications-summary">
          <div>
            <span>Total applications</span>
            <strong>{applications.length}</strong>
          </div>

          <div>
            <span>Active</span>
            <strong>
              {
                applications.filter(
                  (application) =>
                    !["Rejected", "Offer"].includes(application.status),
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Interviews</span>
            <strong>
              {
                applications.filter(
                  (application) => application.status === "Interview",
                ).length
              }
            </strong>
          </div>

          <div>
            <span>Offers</span>
            <strong>
              {
                applications.filter(
                  (application) => application.status === "Offer",
                ).length
              }
            </strong>
          </div>
        </section>

        {/* =====================================================
            TOOLBAR
        ===================================================== */}

        <section className="applications-toolbar">
          <div className="applications-search">
            <Search size={16} strokeWidth={1.5} />

            <input
              type="text"
              placeholder="Search company, role or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="applications-filters">
            <SlidersHorizontal size={15} strokeWidth={1.5} />

            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                className={
                  statusFilter === status
                    ? "filter-btn filter-btn--active"
                    : "filter-btn"
                }
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* =====================================================
            APPLICATION TABLE
        ===================================================== */}

        <section className="applications-card">
          <div className="applications-card-header">
            <div>
              <span>Opportunity tracker</span>

              <h2>
                {statusFilter === "All"
                  ? "All applications"
                  : `${statusFilter} applications`}
              </h2>
            </div>

            <span className="result-count">
              {filteredApplications.length} results
            </span>
          </div>

          {loading ? (
            <div className="applications-state">
              <LoaderCircle
                size={20}
                strokeWidth={1.5}
                className="loading-icon"
              />

              <p>Loading your applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="applications-state applications-state--empty">
              <BriefcaseBusiness size={24} strokeWidth={1.4} />

              <h3>
                {applications.length === 0
                  ? "No applications yet"
                  : "No matching applications"}
              </h3>

              <p>
                {applications.length === 0
                  ? "Start tracking an opportunity to build your career pipeline."
                  : "Try changing your search or status filter."}
              </p>

              {applications.length === 0 && (
                <button type="button" onClick={handleOpenCreate}>
                  <Plus size={14} />
                  Add your first application
                </button>
              )}
            </div>
          ) : (
            <div className="applications-table">
              <div className="applications-table__head">
                <span>Role</span>
                <span>Company</span>
                <span>Location</span>
                <span>Status</span>
                <span>Updated</span>
                <span></span>
              </div>

              {filteredApplications.map((application) => (
                <div className="applications-table__row" key={application._id}>
                  <div className="application-role">
                    <strong>
                      {application.position || application.jobTitle}
                    </strong>

                    {application.jobTitle &&
                      application.position &&
                      application.jobTitle !== application.position && (
                        <small>{application.jobTitle}</small>
                      )}
                  </div>

                  <span className="application-company">
                    {application.company}
                  </span>

                  <span className="application-location">
                    <MapPin size={12} strokeWidth={1.5} />
                    {application.location || "Not specified"}
                  </span>

                  <span
                    className={`application-status ${getStatusClass(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>

                  <span className="application-date">
                    {application.updatedAt
                      ? new Date(application.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "Recently"}
                  </span>

                  <div className="application-actions">
                    {application.jobURL && (
                      <a
                        href={application.jobURL}
                        target="_blank"
                        rel="noreferrer"
                        className="table-action"
                        title="Open job posting"
                      >
                        <ExternalLink size={14} strokeWidth={1.5} />
                      </a>
                    )}

                    <button
                      type="button"
                      className="table-action"
                      title="Edit application"
                      onClick={() => handleOpenEdit(application)}
                    >
                      <Pencil size={14} strokeWidth={1.5} />
                    </button>

                    <button
                      type="button"
                      className="table-action table-action--delete"
                      title="Delete application"
                      onClick={() => handleOpenDelete(application)}
                    >
                      <Trash2 size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showForm && (
        <ApplicationModal
          application={editingApplication}
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
        />
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDelete && (
        <DeleteModal
          application={deleteTarget}
          onClose={() => {
            setShowDelete(false);
            setDeleteTarget(null);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

/* =========================================================
   APPLICATION MODAL
========================================================= */

const ApplicationModal = ({ application, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(
    application
      ? {
          company: application.company || "",
          position: application.position || "",
          jobTitle: application.jobTitle || "",
          location: application.location || "",
          status: application.status || "Applied",
          jobURL: application.jobURL || "",
          notes: application.notes || "",
        }
      : EMPTY_FORM,
  );

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="application-modal">
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {application ? "Application details" : "New opportunity"}
            </span>

            <h2>{application ? "Edit application" : "Add application"}</h2>

            <p>
              {application
                ? "Update the details of this opportunity."
                : "Record a new opportunity in your career pipeline."}
            </p>
          </div>

          <button type="button" className="modal-close" onClick={onClose}>
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Company</label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Systems Limited"
                required
              />
            </div>

            <div className="form-field">
              <label>Position</label>

              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                required
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Job title</label>

              <input
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Junior Software Engineer"
              />
            </div>

            <div className="form-field">
              <label>Location</label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Karachi / Remote"
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.filter((status) => status !== "All").map(
                  (status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div className="form-field">
              <label>Job URL</label>

              <input
                name="jobURL"
                type="url"
                value={formData.jobURL}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-field">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add interview details, recruiter notes or anything you want to remember..."
              rows={4}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modal-submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <LoaderCircle size={14} className="loading-icon" />
                  Saving...
                </>
              ) : (
                <>
                  {application ? "Save changes" : "Add application"}

                  <ArrowUpRight size={14} strokeWidth={1.5} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================
   DELETE MODAL
========================================================= */

const DeleteModal = ({ application, onClose, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="delete-modal">
        <span className="modal-eyebrow">Remove application</span>

        <h2>Delete this opportunity?</h2>

        <p>
          This will permanently remove{" "}
          <strong>{application?.position || "this application"}</strong> at{" "}
          <strong>{application?.company}</strong> from your tracker.
        </p>

        <div className="modal-actions">
          <button
            type="button"
            className="modal-cancel"
            onClick={onClose}
            disabled={deleting}
          >
            Keep application
          </button>

          <button
            type="button"
            className="delete-confirm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applications;
