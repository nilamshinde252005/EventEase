/*
This file reads values from .env

Inside,  will:
-import dotenv and call it so .env is loaded
-create a config object with things like:
    port (e.g., process.env.PORT || 4000)
-databaseUrl ( for Drizzle)
-jwtSecret
-corsOrigin
-export this config object

So: env.js = “all my secret settings in one place”.
*/
// src/config/env.js
import dotenv from "dotenv";

dotenv.config(); // load .env values into process.env

export const config = {
  port: process.env.PORT || 4000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5174",
  jwtSecret:
    process.env.JWT_SECRET ||
    "z8vven5fREfQmM6q35ngstYWiDE0XACJ47HoUm4Hy8Y=",

  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_Ypvl60afcIKd@ep-round-cherry-abzgdi4x-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  mail: {
    host: process.env.MAIL_HOST || "",
    port: process.env.MAIL_PORT || "",
    user: process.env.MAIL_USER || "",
    pass: process.env.MAIL_PASS || "",
  },
};
