// src/admin/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";


export default function AdminSidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "0.5rem 0.75rem",
    marginBottom: "0.25rem",
    textDecoration: "none",
    borderRadius: "6px",
    backgroundColor: isActive ? "#f0f0ff" : "transparent",
    fontWeight: isActive ? "600" : "400",
  });

   return (
    <aside className="admin-sidebar">
      <h3>Admin</h3>

      <NavLink to="/admin/events" style={linkStyle}>
        Events
      </NavLink>

      <NavLink to="/admin/events/create" style={linkStyle}>
        Create event
      </NavLink>
    </aside>
  );
}