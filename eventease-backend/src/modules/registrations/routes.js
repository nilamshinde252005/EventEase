import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";

import {
  createRegistrationController,
  getMyRegistrationsController,
  getAllRegistrationsController,
  getRegistrationsByEventController,
  cancelRegistrationController,
} from "./controller.js";

const router = Router();

// POST /api/registrations -> register current user for an event
router.post("/", requireAuth, createRegistrationController);

// GET /api/registrations/my -> list current user's registrations
router.get("/my", requireAuth, getMyRegistrationsController);

// GET /api/registrations -> list ALL registrations (you can protect this for admin later)
router.get("/", requireAuth, getAllRegistrationsController);

// GET /api/registrations/event/:eventId -> registrations for one event
router.get("/event/:eventId", requireAuth, getRegistrationsByEventController);

// DELETE /api/registrations/:id -> cancel my registration
router.delete("/:id", requireAuth, cancelRegistrationController);

export default router;
