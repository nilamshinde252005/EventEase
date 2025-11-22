import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { useAdminEventsList } from "../hooks/useAdminEvents";
import AdminEventRow from "../components/AdminEventRow";

export default function AdminEventsPage() {
  const { events, loading, error, deleteEvent } = useAdminEventsList();

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-main-inner">
          <h2>Manage Events</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p>Loading...</p>}
          {!loading && events.length === 0 && <p>No events yet.</p>}

          {!loading && events.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Venue</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  <AdminEventRow
                    key={ev.id}
                    event={ev}
                    onDelete={deleteEvent}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
