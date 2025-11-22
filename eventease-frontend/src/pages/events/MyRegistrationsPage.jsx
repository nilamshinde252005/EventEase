import React, { useEffect, useState } from "react";
import {
  getMyRegistrationsApi,
  cancelRegistrationApi,
} from "../../api/registrationsApi";

export default function MyRegistrationsPage() {
  const [regs, setRegs] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const data = await getMyRegistrationsApi();
      if (!data.success)
        throw new Error(data.message || "Failed to load registrations");
      setRegs(data.data || []);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCancel(id) {
    setError("");
    try {
      const data = await cancelRegistrationApi(id);
      if (!data.success) throw new Error(data.message || "Failed to cancel");
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "2rem auto",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
          letterSpacing: "0.05em",
        }}
      >
        My registrations
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {regs.length === 0 && (
        <p>You haven't registered for any events yet.</p>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.8rem",
        }}
      >
        {regs.map((reg) => {
          const event = reg.event || {};
          return (
            <li
              key={reg.id}
              style={{
                display: "flex",
                alignItems: "stretch",
                backgroundColor: "#c07f73",
                borderRadius: "22px",
                padding: "1.2rem 1.6rem",
                boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
                color: "#fffaf7",
                minHeight: "170px",
                gap: "1.6rem",
              }}
            >
              {/* LEFT — IMAGE */}
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
                  alt={event.title || "event poster"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* MIDDLE — DETAILS */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                    }}
                  >
                    {event.title || `Event #${reg.eventId}`}
                  </p>

                  <p
                    style={{
                      margin: "0.4rem 0 0.2rem 0",
                      fontSize: "0.95rem",
                      opacity: 0.9,
                    }}
                  >
                    <strong>Date & Time:</strong>{" "}
                    {event.date} · {event.time}
                  </p>

                  <p
                    style={{
                      margin: "0.2rem 0",
                      fontSize: "0.95rem",
                      opacity: 0.9,
                    }}
                  >
                    <strong>Venue:</strong> {event.venue}
                  </p>

                  <p
                    style={{
                      margin: "0.4rem 0 0",
                      fontSize: "0.95rem",
                    }}
                  >
                    <strong>Registration ID:</strong> #{reg.id}
                  </p>
                  <p
                    style={{
                      margin: "0.2rem 0 0",
                      fontSize: "0.95rem",
                    }}
                  >
                    <strong>Status:</strong> {reg.status}
                  </p>
                </div>
              </div>

              {/* RIGHT — CANCEL BUTTON */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleCancel(reg.id)}
                  style={{
                    padding: "0.7rem 1.6rem",
                    borderRadius: "999px",
                    border: "none",
                    backgroundColor: "#f8f3e8",
                    color: "#5f3b38",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.95rem",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
