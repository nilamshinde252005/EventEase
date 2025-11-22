// src/admin/components/AdminEventRow.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminEventRow({ event, onDelete }) {
  return (
    <tr>
      <td>{event.id}</td>
      <td>{event.title}</td>
      <td>{event.venue}</td>
      <td>{event.capacity}</td>

      <td>
        {/* Top big button */}
        <div style={{ marginBottom: "0.6rem" }}>
          <Link
            to={`/admin/events/${event.id}/registrations`}
            style={{
              display: "inline-block",
              padding: "0.45rem 0.9rem",
              borderRadius: "999px",
              color: "#c07f73",
              backgroundColor: "#f8f3e8",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            View Registrations
          </Link>
        </div>

        {/* Bottom row: Edit + Delete */}
        <div>
          <Link
            to={`/admin/events/${event.id}/edit`}
            style={{
              marginRight: "0.6rem",
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #b9aa95",
              backgroundColor: "#fff9ef",
              color: "#1c1c1c",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(event.id)}
            style={{
              padding: "0.35rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #b9aa95",
              backgroundColor: "#fff9ef",
              color: "#1c1c1c",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
