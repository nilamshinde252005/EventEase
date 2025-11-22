import express from "express";
import {
  createEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
  deleteEventController,
   getEventStatsController,
} from "./controller.js";

import { requireAuth } from "../../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);

// Protected routes (only logged-in users)
router.post("/", requireAuth, createEventController);
router.put("/:id", requireAuth, updateEventController);
router.delete("/:id", requireAuth, deleteEventController);

router.get("/:id/stats", getEventStatsController);

export default router;