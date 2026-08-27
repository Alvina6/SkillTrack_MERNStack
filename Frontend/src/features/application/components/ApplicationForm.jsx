import React from "react";
import { useState } from "react";

const Applicationform = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    position: initialData?.position || "",
    jobTitle: initialData?.jobTitle || "",
    location: initialData?.location || "",
    status: initialData?.status || "Applied",
    jobURL: initialData?.jobURL || "",
    notes: initialData?.notes || "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // page reload rokta hai
    onSubmit(formData);
  }
  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <input
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <input
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />

      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>In Review</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
        <option>Accepted</option>
      </select>

      <input
        name="jobURL"
        placeholder="Job URL"
        value={formData.jobURL}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <div className="application-form__actions">
        <button type="submit">
          {initialData ? "Update" : "Add"} Application
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Applicationform;
