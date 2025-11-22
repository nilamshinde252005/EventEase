import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminEventForm from "../components/AdminEventForm";
import { adminCreateEvent } from "../hooks/useAdminEvents";

export default function AdminCreateEventPage() {
  const navigate = useNavigate();

  async function handleCreate(formData) {
    await adminCreateEvent(formData);
    navigate("/admin/events");
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-main-inner">
          <h2>Create Event</h2>
          <AdminEventForm onSubmit={handleCreate} submitLabel="Create event" />
        </div>
      </main>
    </div>
  );
}
