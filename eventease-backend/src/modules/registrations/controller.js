import {
  createRegistration,
  getAllRegistrations,
  getRegistrationsByUser,
  getRegistrationsByEvent,
  cancelRegistration,
} from "./service.js";

import {
  createRegistrationSchema,
  cancelRegistrationSchema,
} from "./schema.js";

export async function createRegistrationController(req, res) {
  try {
    const userId = req.user?.id; // from auth middleware
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = createRegistrationSchema.parse(req.body);

    const created = await createRegistration(userId, data.eventId);

    return res.status(201).json({
      success: true,
      data: created,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getMyRegistrationsController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const list = await getRegistrationsByUser(userId);

    return res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getAllRegistrationsController(_req, res) {
  try {
    const list = await getAllRegistrations();

    return res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getRegistrationsByEventController(req, res) {
  try {
    const eventId = parseInt(req.params.eventId, 10);

    if (Number.isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event id",
      });
    }

    const list = await getRegistrationsByEvent(eventId);

    return res.json({
      success: true,
      data: list,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export async function cancelRegistrationController(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const id = parseInt(req.params.id, 10);
    cancelRegistrationSchema.parse({ id }); // just to validate

    const deleted = await cancelRegistration(id, userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    return res.json({
      success: true,
      data: deleted,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
