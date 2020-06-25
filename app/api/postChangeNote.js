import 'mssql/msnodesqlv8';
import pool from '../config/config';

async function postNewChangeNote(request) {
  let returnData = {
    error: {}
  };
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
    const changeNoteData = await db.query(query);
    // If customer add worked, then create the change note to show when customer was created
    if (changeNoteData.recordset[0].id) {
      returnData.changeNoteData = {
        success: 'Success',
        changeNoteID: changeNoteData.recordset[0].id,
        changeNoteData
      };
    } else {
      returnData.changeNoteData = {
        success: 'Failed to create change note',
        returnedData: changeNoteData
      };
    }
  } catch (err) {
    returnData = {
      error: err
    };
  }
  return returnData;
}

module.exports = postNewChangeNote;
