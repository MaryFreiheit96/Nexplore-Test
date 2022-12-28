import { Pool } from "pg";

export const pool = () => {
  return new Pool({
    host: "localhost",
    port: 5432,
    username: null,
    password: null,
    database: "postgres",
  });
};
