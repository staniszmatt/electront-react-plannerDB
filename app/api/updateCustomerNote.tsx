/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  customerNoteText: string;
  customerNoteID: number;
  changeNoteDescription: string;
}
interface ReturnData {
  error?: {} | string;
  success?: string;
  customerNoteData?: {
    success: string;
    customerNoteData: {};
  };
  changeNoteData?: {
    success: string;
    changeNoteData: {};
  };
}

async function updateCustomerNote(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };
  // Update to customerNote
  try {
    const db = await pool.connect();
    const query = `UPDATE customerNote
      SET customerNoteText = '${request.customerNoteText}'
        OUTPUT inserted.id, SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
          WHERE id = ${request.customerNoteID}`;
    const data = await db.query(query);
    // If customer add worked, then create the change note to show when customer was created
    if (data.recordset[0].id) {
      returnData.customerNoteData = {
        success: 'Success',
        customerNoteData: data
      };
      try {
        const requestChangeNoteData: any = {
          typeID: data.recordset[0].id,
          typeCategory: 'customerNote',
          // changeNoteDescription: Must be specified with request with every customer not request to specify where its coming from.
          changeNoteDescription: `${request.changeNoteDescription}`,
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };
        const changeNoteData = await postNewChangeNote(requestChangeNoteData);
        returnData.changeNoteData = {
          success: 'Success',
          changeNoteData
        };
      } catch (error) {
        returnData.error = error;
      }
    } else {
      returnData = {
        changeNoteData: {
          success: 'Failed to update customer note!',
          changeNoteData: data
        },
        error: {
          empty: `Something went wrong editing customer note!`
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

export default updateCustomerNote;
