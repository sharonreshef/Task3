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

router.get('/', async (req, res) => {
  try {
    const [hosting, fields] = await pool.execute(`SELECT * FROM hosting`);
    console.log(hosting);
    res.json(hosting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
