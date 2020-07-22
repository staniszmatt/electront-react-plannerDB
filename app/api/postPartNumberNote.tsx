/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  partNumberID: number;
  partNumberNoteText: string;
  changeNoteDescription: string;
}

interface ReturnData {
  partNumberNoteData: {
    error: {};
    success: string;
    noteData: {};
  };
  changeNoteData: {
    success: string;
    changeNoteData: {};
    error: {};
  };
}

async function postPartNumberNote(request: Request) {
  const returnData: ReturnData = {
    partNumberNoteData: {
      error: {},
      success: '',
      noteData: {}
    },
    changeNoteData: {
      success: '',
      changeNoteData: {},
      error: {}
    }
  };

  try {
    const db = await pool.connect();
    const query = `INSERT INTO partNumberNote(partNumberID, partNumberNoteText)
    OUTPUT inserted.id, SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
      VALUES (
          ${request.partNumberID}, '${request.partNumberNoteText}'
          )`;
    const partNumberNoteData = await db.query(query);

    if (partNumberNoteData.recordset[0].id) {
      returnData.partNumberNoteData.success = 'Success';
      returnData.partNumberNoteData.noteData = partNumberNoteData;

      try {
        const requestChangeNoteData: any = {
          typeID: partNumberNoteData.recordset[0].id,
          typeCategory: 'partNumberNote',
          // Must be specified with request with every customer not request to specify where its coming from.
          changeNoteDescription: request.changeNoteDescription,
          userId: `${partNumberNoteData.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${partNumberNoteData.recordset[0].dateStamp}`
        };
        const changeNoteData = await postNewChangeNote(requestChangeNoteData);

        returnData.changeNoteData.success = 'Success';
        returnData.changeNoteData.changeNoteData = changeNoteData;
      } catch (err) {
        returnData.changeNoteData.success = 'Failed to add change note';
        returnData.changeNoteData.error = err;
      }
    } else {
      returnData.partNumberNoteData.noteData = partNumberNoteData;
      returnData.partNumberNoteData.success = 'Error on returning part number note resp!';
      returnData.partNumberNoteData.error = {
        errorMsg: 'Something went wrong adding part number note on return!'
      };
    }
    return returnData;
  } catch (err) {
    returnData.partNumberNoteData.success = 'Failed';
    returnData.partNumberNoteData.error = err;
    return returnData;
  }
}

export default postPartNumberNote;
