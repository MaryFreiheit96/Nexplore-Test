import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

export const config = {
  HOST: process.env.HOST || "http://localhost",
  PORT: process.env.PORT || 3100,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USERNAME: process.env.DB_USERNAME || null,
  DB_PASS: process.env.DB_PASS || null,
  DB_NAME: process.env.DB_NAME || "postgres",
};
