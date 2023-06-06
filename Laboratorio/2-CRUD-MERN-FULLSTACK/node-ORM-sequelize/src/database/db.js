import { Sequelize } from "sequelize";
import "dotenv/config.js";

const { DATABASE_NAME: DBNAME, DATABASE_USER: DBUSER, DATABASE_PW: DBPW, DATABASE_HOST: DBHOST } = process.env;

const db = new Sequelize(DBNAME, DBUSER, DBPW, {
  host: DBHOST,
  dialect: "mysql",
});

export default db;
