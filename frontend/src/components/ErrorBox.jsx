import React from "react";

function formatError(err) {
  if (!err) return null;
  // if it's already a string
  if (typeof err === "string") return err;
  // if DRF returns { detail: '...' }
  if (err.detail) return String(err.detail);
  // if it's an object of field errors { field: [..] }
  if (typeof err === "object") {
    try {
      const parts = [];
      for (const key of Object.keys(err)) {
        const val = err[key];
        if (Array.isArray(val)) parts.push(`${key}: ${val.join(", ")}`);
        else parts.push(`${key}: ${String(val)}`);
      }
      return parts.join("\n");
    } catch (e) {
      return JSON.stringify(err);
    }
  }
  return String(err);
}

export default function ErrorBox({ error, onClose }) {
  const message = formatError(error);
  if (!message) return null;
  return (
    <div className="error-box" role="alert">
      <div className="error-content">
        <div className="error-message">
          {message.split("\n").map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        {onClose && (
          <button
            className="error-close"
            onClick={onClose}
            aria-label="Close error"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
