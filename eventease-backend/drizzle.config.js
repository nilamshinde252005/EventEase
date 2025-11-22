// tells Drizzle where your schema is and how to reach DB
import "dotenv/config";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // IMPORTANT: the key must be "url", not "connectionString"
    url: process.env.DATABASE_URL
  }
};
