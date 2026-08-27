export default function ApplicationCard({ application, onEdit, onDelete }) {
  return (
    <div className="application-card">
      <h3>{application.position}</h3>
      <p>
        {application.company} · {application.location}
      </p>
      <span className={`status status--${application.status.toLowerCase()}`}>
        {application.status}
      </span>

      <div className="application-card__actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
