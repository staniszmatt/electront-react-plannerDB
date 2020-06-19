import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function singleCustomer(request) {
  console.log("Request Single Customer API, Request: ", request);
  let returnData = {};
  try {
    const db = await pool.connect();
    const query = `SELECT id, c.customerName, c.customerCodeName, c.customerGenStd, c.customerRsStd, c.customerActive
      FROM  customer as c
        WHERE (c.customerName = '${request.customerName}')`;

    console.log("Data query for customer request ", query);
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
          empty: `No Data Found For Customer ${request.customerName}`
        }
      };
    }
    return returnData;
  } catch (err) {
    returnData = {
      list: [],
      error: err
    }
    return returnData;
  }
}

module.exports = singleCustomer;
