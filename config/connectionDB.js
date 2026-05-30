const mysql = require('mysql2/promise');
require('dotenv').config()

console.log("--- DATABASE DEBUG INFO ---");
console.log("HOST:", process.env.MYSQLHOST);
console.log("PORT:", process.env.MYSQLPORT);
console.log("USER:", process.env.MYSQLUSER);
console.log("---------------------------");


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




pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL via Pool');
  
  // Important: Release the connection back to the pool immediately
  connection.release();
});

module.exports = pool;