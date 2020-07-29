/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  noteText: string;
  noteID: number;
  changeNoteDescription: string;
}
interface ReturnData {
  error?: {} | string;
  success?: string;
  partNumberNoteData?: {
    success: string;
    noteData: {};
  };
  changeNoteData?: {
    success: string;
    changeNoteData: {};
  };
}

async function updatePartNumberNote(request: Request) {
  console.log('Part Number Update Note Request: ', request);
  let returnData: ReturnData = {
    error: {}
  };
  // Update to part number note
  try {
    const db = await pool.connect();
    const query = `
      UPDATE partNumberNote
        SET partNumberNoteText = '${request.noteText}'
          OUTPUT inserted.id, SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
            WHERE id = ${request.noteID}
    `;
    const data = await db.query(query);
    // If part number add worked, then create the change note to show when part number was created
    if (data.recordset[0].id) {
      returnData.partNumberNoteData = {
        success: 'Success',
        noteData: data
      };
      try {
        const requestChangeNoteData: any = {
          typeID: data.recordset[0].id,
          typeCategory: 'partNumberNote',
          // changeNoteDescription: Must be specified with request with every part number not request to specify where its coming from.
          changeNoteDescription: `${request.changeNoteDescription}`,
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };
        const changeNoteData = await postNewChangeNote(requestChangeNoteData);
        returnData.changeNoteData = {
          success: 'Success',
          changeNoteData
        };
      } catch (err) {
        returnData.error = err;
        console.log('Part Num Update second Error: ', err)
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
      console.log('Part Num Update first else Error: ', returnData);
    }
    return returnData;
  } catch (err) {
    console.log('Part Num Update Error: ', err)
    returnData = {
      error: err
    };
  }
  return returnData;
}

export default updatePartNumberNote;
