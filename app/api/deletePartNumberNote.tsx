/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  request: string;
  noteID: number;
  partNumberID: number;
  changeNoteDescription: string;
}

interface ReturnData {
  error?: {};
  changeNoteData?: {
    success: string;
    changeNoteData: {};
  };
  noteData?: {
    success: string;
    noteData: {};
  };
}

async function deletePartNumberNote(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };

  // Delete to part number note
  try {
    const db = await pool.connect();
    const query = `
      DELETE partNumberNote
        OUTPUT SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
          WHERE id = ${request.noteID}
    `;

    const data = await db.query(query);
    // If partNumber add worked, then create the change note to show when part number was created
    if (data.recordset[0].LoggedInUser) {
      returnData.noteData = {
        success: 'Success',
        noteData: data
      };
      try {
        const requestChangeNoteData: any = {
          typeID: request.partNumberID,
          typeCategory: 'partNumber',
          // changeNoteDescription: Must be specified with request with every part number not request to specify where its coming from.
          changeNoteDescription: `${request.changeNoteDescription}`,
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };
        // eslint-disable-next-line prettier/prettier
        const changeNoteDataResp = await postNewChangeNote(requestChangeNoteData);
        returnData.changeNoteData = {
          success: 'Success',
          changeNoteData: changeNoteDataResp
        };
      } catch (error) {
        returnData.error = error;
      }
    } else {
      returnData = {
        changeNoteData: {
          success: 'Failed to update part number note!',
          changeNoteData: data
        },
        error: {
          empty: `Something went wrong editing part number note!`
        }
      };
    }
    return returnData;
  } catch (err) {
    returnData = {
      error: err
    };
  }
  return returnData;
}

export default deletePartNumberNote;
