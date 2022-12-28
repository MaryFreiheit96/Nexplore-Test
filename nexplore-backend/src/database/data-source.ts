import { Pool } from "pg";
import { config } from "../../config";

export const pool = () => {
  return new Pool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASS,
    database: config.DB_NAME,
  });
};
