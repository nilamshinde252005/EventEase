import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "./service.js";

import {
    createEventSchema,
    updateEventSchema,
} from "./schema.js";

import { countTicketsForEvent } from "../registrations/service.js";

export async function createEventController(req, res) {
    try {
        const data = createEventSchema.parse(req.body);
        const event = await createEvent(data);
        return res.status(201).json({
            success: true,
            data: event,
        });
    } catch (err) {
        console.error("Create event error:", err);
        return res.status(400).json({
            success: false,
            message: err.message, // zod error
        });
    }
}

export async function getAllEventsController(req, res) {
    try {
        const events = await getAllEvents();
        return res.json({ success: true, data: events });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getEventByIdController(req, res) {
    try {
        const eventId = parseInt(req.params.id);

        const event = await getEventById(eventId);
        // when || null
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        // when return[0] i,e event exists
        return res.json({ success: true, data: event });
    }
    // If something else breaks
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function updateEventController(req, res) {
    try {
        const eventId = parseInt(req.params.id);
        const data = updateEventSchema.parse(req.body);

        const updated = await updateEvent(eventId, data);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        return res.json({ success: true, data: updated });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
}

export async function deleteEventController(req, res) {
    try {
        const eventId = parseInt(req.params.id);
        const deleted = await deleteEvent(eventId);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        return res.json({ success: true, data: deleted });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export async function getEventStatsController(req, res) {
  try {
    const eventId = parseInt(req.params.id);

    const event = await getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const sold = await countTicketsForEvent(eventId);
    const capacity = event.capacity || 0;
    const remaining = Math.max(capacity - sold, 0);
    const percentage = capacity > 0 ? (sold / capacity) * 100 : 0;

    return res.json({
      success: true,
      data: {
        eventId,
        sold,
        capacity,
        remaining,
        percentage,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to load event stats",
    });
  }
}