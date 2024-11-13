import type { Knex } from "knex";
import { config as dotenv } from "dotenv";

dotenv();
// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_EXTERN),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    }
  },

};

module.exports = config;