// JWT auth middleware (protect routes)

// src/middleware/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "z8vven5fREfQmM6q35ngstYWiDE0XACJ47HoUm4Hy8Y=";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    // MUST match the payload we sign in createToken()
    req.user = {
      id: payload.id,
      email: payload.email,
      // role: payload.role, // if you add this in createToken
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
