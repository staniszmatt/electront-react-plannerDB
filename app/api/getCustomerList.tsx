import 'mssql/msnodesqlv8';
import pool from '../config/config';

// Query of a list of items as user types in search
//
//  SELECT customer.CustomerName
//    FROM customer
//      WHERE CustomerName LIKE 'CAL%'
//        ORDER BY CustomerName ASC

async function customerList() {
  let returnData = {};
  try {
    const db = await pool.connect();
    const query = `
      select * from customer
        ORDER BY customerName ASC
    `;
    const data = await db.query(query);

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
    returnData = {
      list: [],
      error: err
    };
    return returnData;
  }
}

export default customerList;
