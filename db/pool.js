const { Pool } = require("pg");
require('dotenv').config(); // Load environment variables from .env file

// All of the following properties should be read from environment variables
const pool = new Pool({
  host: process.env.DB_HOST, // Use environment variable
  user: process.env.DB_USER, // Use environment variable
  database: process.env.DB_NAME, // Use environment variable
  password: process.env.DB_PASSWORD, // Use environment variable
  port: process.env.DB_PORT, // Use environment variable
});

module.exports = pool;

