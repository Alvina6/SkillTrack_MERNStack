import { AlertCircle, X } from "lucide-react";
import "../styles/RequestError.scss";

export default function RequestError({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="request-error" role="alert">
      <AlertCircle size={17} aria-hidden="true" />
      <p>{message}</p>
      <button type="button" onClick={onDismiss} aria-label="Dismiss error">
        <X size={16} />
      </button>
    </div>
  );
}
