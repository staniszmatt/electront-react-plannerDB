require('mssql/msnodesqlv8');
const pool = require('../config/config');

async function customerList() {
  try {
    const db = await pool.connect();
    const query = `select * from customer`;

    const data = await db.query(query);

    console.log('config data request data', data);
    return data.recordset;

  } catch (err) {
    console.log("Error config", err);
  }
}

module.exports = customerList;
