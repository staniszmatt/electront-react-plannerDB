import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function postNewChangeNote(request) {
  console.log("Post New Change Note: ", request);
  let returnData = {};
  // Post to add a new change note
  try {
    const db = await pool.connect();
    const query = `INSERT INTO changeNote (
      typeID,
      typeCategory,
      changeNoteDescription,
      userId,
      changeNoteDateStamp
      )
        OUTPUT inserted.id
        VALUES (
          ${request.typeID},
          '${request.typeCategory}',
          '${request.changeNoteDescription}',
          '${request.userId}',
          '${request.changeNoteDateStamp}'
          )`;

    console.log("Data query for changeNote request ", query);
    const data = await db.query(query);

    console.log('config data changeNote', data);
    console.log('changeNote ', data.recordset[0].id);
    // If customer add worked, then create the change note to show when customer was created
    if (data.recordset[0].id) {
      returnData.data = data;
      returnData.error = {};
    } else {
      returnData.data = {
        success: 'Failed to create change note',
        returnedData: data,
      };
      returnData.error = {};
    }
    return returnData;
  } catch (err) {
    returnData = {
      error: err
    };
    return returnData;
  }
}

module.exports = postNewChangeNote;
