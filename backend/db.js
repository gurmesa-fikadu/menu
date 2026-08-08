// db.js
// MySQL connection pool for Habesha Bites backend.
// Uses mysql2/promise for async/await support.
const mysql = require('mysql2/promise')
require('dotenv').config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'habesha_bites',
  port: Number(process.env.DB_PORT) || 3306,
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false, // Required for Aiven SSL on Render
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool