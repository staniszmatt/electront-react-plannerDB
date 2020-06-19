require('mssql/lib/msnodesqlv8');
const pool = require('../config/config');

async function singleCustomer() {
  let returnData = {};
  try {
    const db = await pool.connect();
    const query = `select * from customer`;
    const data = await db.query(query);

    console.log('config data request data', data);

    if (data.recordset.length > 0) {
      returnData = {
        list: data.recordset,
        error: {}
      };
    } else if (data.recordset.length === 0) {
      returnData = {
        list: [],
        error: {
          empty: 'No Data Found For Customers'
        }
      };
    }
    return returnData;
  } catch (err) {
    console.log("Error config", err);
    returnData = {
      list: [],
      error: err
    }
    return returnData;
  }
}

module.exports = singleCustomer;
