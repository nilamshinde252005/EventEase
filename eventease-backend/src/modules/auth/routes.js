import { Router } from "express";
import { registerController, loginController } from "./controller.js";
import { validate } from "../../middleware/validate.js";
import { registerSchema, loginSchema } from "./schema.js";

const router = Router();

// POST /api/auth/register
router.post("/register", validate(registerSchema), registerController);

// POST /api/auth/login
router.post("/login", validate(loginSchema), loginController);

export default router;
