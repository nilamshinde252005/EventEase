import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEventsApi } from "../../api/eventsApi";

export default function EventsListPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getEventsApi();
        if (!data.success)
          throw new Error(data.message || "Failed to load events");
        setEvents(data.data);
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Upcoming events</h2>
      {events.length === 0 && <p>No events yet.</p>}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "1.8rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {events.map((ev, index) => {
          const isEven = index % 2 === 0;

          return (
            <li
              key={ev.id}
              style={{
                display: "flex",
                flexDirection: isEven ? "row" : "row-reverse",
                borderRadius: "22px",
                overflow: "hidden",
                minHeight: "260px",

                /* PURE solid rose-metal background */
                backgroundColor: "#c07f73",

                border: "1px solid #5f3b38",
                boxShadow: "0 18px 34px rgba(0,0,0,0.55)",
              }}
            >
              {/* LEFT/RIGHT IMAGE BLOCK */}
              <div
                style={{
                  flex: "0 0 45%",
                  backgroundImage: ev.posterUrl
                    ? `url(${ev.posterUrl})`
                    : "url(/placeholder.jpg)", // fallback
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "260px",
                  opacity: 0.9,
                }}
              />

              {/* TEXT SECTION */}
              <div
                style={{
                  flex: 1,
                  padding: "1.9rem 2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                      color: "#fffdfc",
                    }}
                  >
                    {ev.title}
                  </h3>

                  <p
                    style={{
                      margin: "0.6rem 0",
                      fontSize: "1.05rem",
                      opacity: 0.95,
                    }}
                  >
                    {ev.venue}
                  </p>

                  <p
                    style={{
                      margin: "0.35rem 0",
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "#f5deda",
                    }}
                  >
                    Capacity: {ev.capacity}
                  </p>
                </div>

                <Link
                  to={`/events/${ev.id}`}
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    color: "#fffdfc",
                    marginTop: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  View details <span>↗</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
