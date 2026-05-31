const mysql = require('mysql2');

console.log("=====================================");
console.log("⚙️ INITIALIZING DATABASE CONFIG");
console.log("TARGET HOST:", process.env.MYSQLHOST);
console.log("TARGET PORT:", process.env.MYSQLPORT);
console.log("=====================================");

// Create a standard pool setup
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000 // Stop waiting after 5 seconds
});

// Convert the pool to use promises cleanly
const promisePool = pool.promise();

// Simple callback-based check that CANNOT freeze the async event loop
pool.query('SELECT 1', (err, results) => {
  if (err) {
    console.error("❌ DATABASE CONNECTIVITY ERROR:", err.message);
  } else {
    console.log("✅ DATABASE CONNECTED SUCCESSFULLY VIA PUBLIC PROXY!");
  }
});

module.exports = promisePool;