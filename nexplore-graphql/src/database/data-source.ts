import { Pool } from "pg";

export const pool = () => {
  return new Pool({
    host: "localhost",
    port: 5432,
    password: "",
    database: "postgres",
  });
};
