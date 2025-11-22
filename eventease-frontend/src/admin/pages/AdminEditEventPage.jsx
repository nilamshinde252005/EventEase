import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminEventForm from "../components/AdminEventForm";
import { useAdminSingleEvent, adminUpdateEvent } from "../hooks/useAdminEvents";

export default function AdminEditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error } = useAdminSingleEvent(id);

  async function handleUpdate(formData) {
    await adminUpdateEvent(id, formData);
    navigate("/admin/events");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-main-inner">
          <h2>Edit Event</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading && <p>Loading...</p>}

          {event && (
            <AdminEventForm
              initialValues={event}
              onSubmit={handleUpdate}
              submitLabel="Save changes"
            />
          )}
        </div>
      </main>
    </div>
  );
}
