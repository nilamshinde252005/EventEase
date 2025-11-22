import React from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useAdminRegistrations } from "../hooks/useAdminRegistrations";

export default function AdminEventRegistrationsPage() {
  const { id } = useParams();
  const { registrations, loading, error } = useAdminRegistrations(id);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "1rem 1.5rem" }}>
        <h2>Registrations for event #{id}</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}

        {!loading && registrations.length === 0 && (
          <p>No one has registered for this event yet.</p>
        )}

        {!loading && registrations.length > 0 && (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Status</th>
                <th>Registered at</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.userId}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
