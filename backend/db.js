// db.js
// MySQL connection pool for Habesha Bites backend.
// Uses mysql2/promise for async/await support.
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',       // default XAMPP password is blank
  database: 'habesha_bites',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
