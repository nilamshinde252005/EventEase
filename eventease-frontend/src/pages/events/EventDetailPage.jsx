// src/pages/events/EventDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventApi } from "../../api/eventsApi";
import { registerForEventApi } from "../../api/registrationsApi";
import { useEventStats } from "../../admin/hooks/useEventStats";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ tickets stats for this event (public)
  const {
    stats,
    loading: statsLoading,
    error: statsError,
  } = useEventStats(Number(id));

  useEffect(() => {
    async function load() {
      setError("");
      try {
        const data = await getEventApi(id);
        if (!data.success)
          throw new Error(data.message || "Failed to load event");
        setEvent(data.data);
      } catch (err) {
        setError(err.message);
      }
    }
    if (id) load();
  }, [id]);

  async function handleRegister() {
    setError("");
    setMessage("");
    try {
      const data = await registerForEventApi(Number(id));
      if (!data.success) throw new Error(data.message || "Failed to register");
      setMessage("Registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading...</p>;

  // 📊 percentages for the chart
  let soldPercent = 0;
  let remainingPercent = 0;

  if (stats && stats.capacity > 0) {
    soldPercent = (stats.sold / stats.capacity) * 100;
    soldPercent = Math.min(Math.max(soldPercent, 0), 100);
    remainingPercent = 100 - soldPercent;
  }

  // 🎨 brand colors
  const SOLD_COLOR = "#f8f3e8"; // cream / light
  const REMAINING_COLOR = "#c07f73"; // rose clay

  // 🎨 background for pie chart using conic-gradient
  const pieBackground =
    stats && stats.capacity > 0
      ? `conic-gradient(${SOLD_COLOR} 0 ${soldPercent}%, ${REMAINING_COLOR} ${soldPercent}% 100%)`
      : REMAINING_COLOR;

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto" }}>
      <h2 style={{ marginBottom: "1rem" }}>{event.title}</h2>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT: event details */}
        <div style={{ flex: "1 1 55%", minWidth: "260px" }}>
          {event.posterUrl && (
            <img
              src={event.posterUrl}
              alt={event.title}
              style={{
                width: "100%",
                maxHeight: "320px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "1rem",
              }}
            />
          )}

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Capacity:</strong> {event.capacity}
          </p>

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleRegister} style={{ marginTop: "0.75rem" }}>
            Register for this event
          </button>
        </div>

        {/* RIGHT: tickets + pie chart */}
        <div
          style={{
            marginLeft:"2rem",
            flex: "1 1 35%",
            minWidth: "240px",
            padding: "1rem 2.25rem",
            borderRadius: "16px",
            border: "1px solid #d1c5b1",
            backgroundColor: "#080808ff",
            boxShadow: "0 10px 22px rgba(0,0,0,0.35)",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Tickets</h3>

          {statsLoading && <p>Loading tickets info...</p>}
          {statsError && <p style={{ color: "red" }}>{statsError}</p>}

          {stats && (
            <>
              <p style={{ marginBottom: "0.5rem" }}>
                {stats.sold} / {stats.capacity} tickets sold
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginTop: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Pie chart */}
                <div
                  style={{
                    
                    marginLeft:"2.2rem",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: pieBackground,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
                  }}
                />

                {/* Legend + numbers */}
                <div style={{ fontSize: "0.9rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: SOLD_COLOR,
                      }}
                    />
                    <span>
                      <strong>Sold:</strong> {stats.sold} (
                      {soldPercent.toFixed(0)}%)
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: REMAINING_COLOR,
                      }}
                    />
                    <span>
                      <strong>Remaining:</strong> {stats.remaining} (
                      {remainingPercent.toFixed(0)}%)
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      marginTop: "0.5rem",
                      color: "#555",
                    }}
                  >
                    {stats.remaining > 0
                      ? `${stats.remaining} tickets still available`
                      : "Sold out"}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
