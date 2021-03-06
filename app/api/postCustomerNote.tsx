/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  customerID: number;
  customerNote: string;
  changeNoteDescription: string;
}

interface ReturnData {
  error?: {} | string;
  customerNoteData?: {
    success: string;
    customerNoteData: {};
  };
  changeNoteData?: {
    success: string;
    changeNoteData: {};
  };
}

async function postCustomerNote(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };
  // Post to add new customer
  try {
    const db = await pool.connect();
    const query = `INSERT INTO customerNote (customerID, customerNoteText)
      OUTPUT inserted.id, SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
        VALUES (
          ${request.customerID}, '${request.customerNote}'
          )`;
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
          // Must be specified with request with every customer not request to specify where its coming from.
          changeNoteDescription: request.changeNoteDescription,
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };
        const changeNoteData = await postNewChangeNote(requestChangeNoteData);
        returnData.changeNoteData = {
          success: 'Success',
          changeNoteData
        };
        // TODO: Add CustomerNote post here
      } catch (error) {
        returnData.error = error;
      }
    } else {
      returnData = {
        changeNoteData: {
          success: 'Failed to add customer note!',
          changeNoteData: data
        },
        error: {
          empty: `Something went wrong on adding customer note!`
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

export default postCustomerNote;
