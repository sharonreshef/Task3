var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'serverdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

module.exports = router;
