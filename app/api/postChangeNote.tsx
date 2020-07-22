import 'mssql/msnodesqlv8';
import pool from '../config/config';

interface Request {
  typeID: number;
  typeCategory: string;
  changeNoteDescription: string;
  userId: number;
  changeNoteDateStamp: string;
}

interface ReturnData {
  changeNoteData: {
    success: string;
    error: {};
    changeNoteData: {};
  };
}

async function postNewChangeNote(request: Request) {
  const returnData: ReturnData = {
    changeNoteData: {
      error: {},
      success: '',
      changeNoteData: {}
    }
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
      returnData.changeNoteData.success = 'Success';
      returnData.changeNoteData.changeNoteData = changeNoteData;
    } else {
      returnData.changeNoteData.success = 'Error on resp from adding change note!';
      returnData.changeNoteData.changeNoteData = changeNoteData;
      returnData.changeNoteData.error = {
        errorMsg: 'Error occurred on response from server adding change note!'
      };
    }
  } catch (err) {
    returnData.changeNoteData.error = err;
    returnData.changeNoteData.success = 'Failed';
  }
  return returnData;
}

export default postNewChangeNote;
