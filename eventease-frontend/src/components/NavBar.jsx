import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav
      style={{
        padding: "0.75rem 1.5rem",
        borderBottom: "1px solid #eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/events" style={{ marginRight: "1rem", fontWeight: "bold" }}>
          EventEase
        </Link>
        {user && (
          <Link to="/my-registrations" style={{ marginRight: "1rem" }}>
            My registrations
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin/events" style={{ marginRight: "1rem" }}>
            Admin
          </Link>
        )}
      </div>

      <div>
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: "1rem" }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <span style={{ marginRight: "1rem" }}>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
