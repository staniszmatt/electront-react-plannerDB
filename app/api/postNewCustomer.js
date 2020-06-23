import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function postNewCustomer(request) {
  console.log("Add Customer API, Request: ", request);
  let returnData = {};
  try {
    const db = await pool.connect();
    const query = `DECLARE @ReturnID TABLE ([id] INT)
      INSERT INTO customer (customerName, customerCodeName, customerGenStd, customerRsStd, customerActive)
      OUTPUT inserted.id INTO @ReturnID
        VALUES (
          '${request.customerName}', '${request.customerCodeName}', ${request.customerGenStatus}, ${request.customerRSStatus}, ${request.customerActive}
          )`;

    console.log("Data query for customer request ", query);
    const data = await db.query(query);

    console.log('config data request data', data);

    if (data) {
      returnData = {
        data,
        error: {}
      };
    } else {
      returnData = {
        data,
        error: {
          empty: `Something went wrong on adding customer`
        }
      };
    }
    return returnData;
  } catch (err) {
    returnData = {
      error: err
    }
    return returnData;
  }
}

module.exports = postNewCustomer;
