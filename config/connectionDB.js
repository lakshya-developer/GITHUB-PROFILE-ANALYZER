const mysql = require('mysql2/promise');
require('dotenv').config()

console.log("=====================================");
console.log("🚀 STARTING DB LIFECYCLE CHECK");
console.log("DB HOST:", process.env.MYSQLHOST);
console.log("DB PORT:", process.env.MYSQLPORT);
console.log("DB USER:", process.env.MYSQLUSER);
console.log("=====================================");

const pool = mysql.createPool({
  host: process.env.MYQLHOST || process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0 
})

// Asynchronous verification wrapper
async function testConnection() {
  try {
    // Get a connection from the pool, run a simple query, and release it
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed during startup sequence:");
    console.error(error.message);
    return false;
  }
}

module.exports = pool;