// src/db/index.js
// creates Drizzle db client: connects to Postgres using DATABASE_URL and wraps it with Drizzle

import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "../config/env.js";
import * as schema from "./schema.js";

const { Pool } = pkg;

// Create a connection pool using DATABASE_URL
export const pool = new Pool({
  connectionString: config.databaseUrl,
});

// Wrap pool with Drizzle, including schema
export const db = drizzle(pool, { schema });
