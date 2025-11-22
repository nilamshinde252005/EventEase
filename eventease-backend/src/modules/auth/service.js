// src/modules/auth/service.js
// All the "logic" that talks to Drizzle + Neon (DB + password + token)

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm"; // Helper to build WHERE clause like WHERE users.email = ?
import { db } from "../../db/index.js"; // Drizzle database instance

import { users } from "../../db/schema.js";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "z8vven5fREfQmM6q35ngstYWiDE0XACJ47HoUm4Hy8Y=";

const JWT_EXPIRES_IN = "7d";

// Helper: find user by email
async function findUserByEmail(email) {
  const result = await db.select().from(users).where(eq(users.email, email));
  return result[0] || null;
}

// Helper: create JWT token
/* 
  jwt.sign(payload, secret, options):

  payload = data you want to embed in the token.
  secret  = JWT_SECRET (must match the one you use to verify).
*/
function createToken(user) {
  return jwt.sign(
    {
      // IMPORTANT: use "id" here to match requireAuth
      id: user.id,
      email: user.email,
      // you can also include role if you have it:
      // role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

// registerUser – sign up logic
export async function registerUser({ name, email, password }) {
  // 1) Check if user already exists
  const existing = await findUserByEmail(email);
  if (existing) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error; // controller will catch this and send a proper response
  }

  // 2) Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3) Insert user into DB (only storing safe fields in "returning")
  const inserted = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
    });

  const newUser = inserted[0];

  // 4) Create token for this new user
  const token = createToken(newUser);

  // 5) Return safe user data + token
  return {
    user: newUser, // safe (no passwordHash)
    token,         // frontend will store it in localStorage
  };
}

// loginUser – login logic
export async function loginUser({ email, password }) {
  // 1) Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid email");
    error.status = 401;
    throw error;
  }

  // 2) Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 401;
    throw error;
  }

  // 3) Create token
  const token = createToken(user);

  // 4) Remove passwordHash from user before returning
  const { passwordHash, ...safeUser } = user;

  // 5) Return safe user data + token
  return {
    user: safeUser,
    token,
  };
}
