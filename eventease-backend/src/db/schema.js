// src/db/schema.js
// Drizzle table definitions (ESM version)

import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

// Enums for roles + registration status
export const userRole = pgEnum("user_role", ["ADMIN", "STUDENT"]);

export const registrationStatus = pgEnum("registration_status", [
  "REGISTERED",
  "CANCELLED",
  "CHECKED_IN",
]);

// users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRole("role").notNull().default("STUDENT"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// events table
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  venue: varchar("venue", { length: 200 }).notNull(),
  startAt: timestamp("start_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  endAt: timestamp("end_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  capacity: integer("capacity").notNull(),
  tags: text("tags").notNull().default("[]"),
  posterUrl: text("poster_url"),
  createdBy: integer("created_by").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// registrations table
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // FK to users.id (app-level)
  eventId: integer("event_id").notNull(), // FK to events.id (app-level)
  status: registrationStatus("status").notNull().default("REGISTERED"),
  qrCode: varchar("qr_code", { length: 255 }).notNull().default("TEMP"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// optional checkin_logs table
export const checkinLogs = pgTable("checkin_logs", {
  id: serial("id").primaryKey(),
  registrationId: integer("registration_id").notNull(),
  scannedAt: timestamp("scanned_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  scannedBy: integer("scanned_by"), // which admin user checked them in
});
