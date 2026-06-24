const mysql = require('mysql2/promise');

let pool;

async function initializeMysql() {
  try {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'thaigger_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('MySQL connected successfully');
    connection.release();
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    process.exit(1);
  }
}

function getMysqlPool() {
  return pool;
}

module.exports = { initializeMysql, getMysqlPool };
