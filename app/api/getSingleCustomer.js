import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function singleCustomer(request) {
  console.log('Request Single Customer API, Request: ', request);
  const returnData = {
    error: {}
  };

  try {
    const db = await pool.connect();
    const query = `SELECT id, c.customerName, c.customerCodeName, c.customerGenStd, c.customerRsStd, c.customerActive
      FROM  customer as c
        WHERE (c.customerName = '${request.customerName}')`;

    console.log('Data query for single customer request ', query);
    const data = await db.query(query);

    console.log('Returned Single Customer Data:', data);
    // If the data is good for the start of if statement
    if (data.recordset.length > 0) {
      // TODO: *** Setup Next Data Pull for Customer Notes HERE! ***

      returnData.list = data.recordset;

    } else if (data.recordset.length === 0) {
      returnData.list = [];
      returnData.error = {
        empty: `No Data Found For Customer ${request.customerName}`
      };
    }
    return returnData;
  } catch (err) {
    returnData.list = [];
    returnData.error = err;
    return returnData;
  }
}

module.exports = singleCustomer;
