import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function partNumberList() {
  let returnData = {};
  try {
    const db = await pool.connect();
    const query = `
      SELECT * FROM partNumber
        ORDER BY partNumberName ASC
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
          empty: 'No Data Found For Part Numbers'
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

export default partNumberList;
