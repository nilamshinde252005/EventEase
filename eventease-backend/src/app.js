/* 
This file creates the Express app.

Inside,  will:
-import express
-create const app = express()
-add app.use(express.json()) for JSON body parsing
-add app.use(cors()) (later from custom middleware)
-add a test route like GET /health just to check the server works
-export app

So: app.js = “how the server behaves”.
*/

// src/app.js
import express from "express";
import cors from "cors";
import { config } from "./config/env.js";

// import your route modules
import authRoutes from "./modules/auth/routes.js";
import eventsRoutes from "./modules/events/routes.js";
import registrationsRoutes from "./modules/registrations/routes.js";

const app = express();

// parse JSON bodies
app.use(express.json());

// CORS: allow frontend to call backend in dev
app.use(
  cors({
    origin: config.corsOrigin, // http://localhost:5174
    credentials: true,
  })
);

// real API routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/registrations", registrationsRoutes);

// 404 fallback (keep this LAST)
app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export { app };
