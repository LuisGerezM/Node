import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3001;

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || "luis";
const DB_PASSWORD = process.env.DB_PASSWORD || "pw";
const DB_DATABASE = process.env.DB_DATABASE || "name_db";

export { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE };
