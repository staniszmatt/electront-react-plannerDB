/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  request: string;
  customerNoteID: number;
  customerID: number;
  changeNoteDescription: string;
}

interface ReturnData {
  error?: {};
  changeNoteData?: {
    success: string;
    changeNoteData: {};
  };
  customerNoteData?: {
    success: string;
    customerNoteData: {};
  };
}

async function deleteCustomerNote(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };

  // Delete to customerNote
  try {
    const db = await pool.connect();
    const query = `DELETE customerNote
      OUTPUT SUSER_NAME() LoggedInUser,  GETDATE() as dateStamp
        WHERE id = ${request.customerNoteID}`;

    const data = await db.query(query);
    // If customer add worked, then create the change note to show when customer was created
    if (data.recordset[0].LoggedInUser) {
      returnData.customerNoteData = {
        success: 'Success',
        customerNoteData: data
      };
      try {
        const requestChangeNoteData: any = {
          typeID: request.customerID,
          typeCategory: 'customer',
          // changeNoteDescription: Must be specified with request with every customer not request to specify where its coming from.
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

export default deleteCustomerNote;
