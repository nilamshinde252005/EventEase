import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import AppLayout from "../components/AppLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import EventsListPage from "../pages/events/EventsListPage";
import EventDetailPage from "../pages/events/EventDetailPage";
import MyRegistrationsPage from "../pages/events/MyRegistrationsPage";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

// import Admin pages 
import AdminEventsPage from "../admin/pages/AdminEventsPage";
import AdminCreateEventPage from "../admin/pages/AdminCreateEventPage";
import AdminEditEventPage from "../admin/pages/AdminEditEventPage";
import AdminEventRegistrationsPage from "../admin/pages/AdminEventRegistrationsPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          <Route
            path="/my-registrations"
            element={
              <ProtectedRoute>
                <MyRegistrationsPage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes will go here wrapped in <AdminRoute> */}
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEventsPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events/create"
            element={
              <AdminRoute>
                <AdminCreateEventPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events/:id/edit"
            element={
              <AdminRoute>
                <AdminEditEventPage />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/events/:id/registrations"
            element={
              <AdminRoute>
                <AdminEventRegistrationsPage />
              </AdminRoute>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
