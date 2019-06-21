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
    queueLimit: 0,
    dateStrings: true
  });
})();

router.get('/', async (req, res) => {
  try {
    const [servers, fields] = await pool.execute(`SELECT * FROM servers`);
    console.log(servers);
    res.json(servers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  // console.log(req.body);
  const { ALIAS, IP, hosting } = req.body;
  try {
    await pool.execute(
      `INSERT INTO servers (ALIAS, IP, server_status, date_created, HostingID) VALUES (?, ?, 1, NOW(), ?)`,
      [ALIAS, IP, hosting]
    );
    res.send({
      status: 'success'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.execute(`DELETE FROM servers WHERE id=?`, [
      id
    ]);
    if (results.affectedRows) {
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body, req.params);
  const { id } = req.params;
  const { status } = req.body;
  console.log(req.body);
  try {
    const [results] = await pool.execute(
      `UPDATE servers SET server_status = ? WHERE id = ?;`,
      [status, id]
    );
    if (results.affectedRows) {
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ success: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
