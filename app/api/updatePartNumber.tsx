/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

interface Request {
  partNumberName: string;
  partNumberMaterial: string;
  partNumberSerialNumberRequired: number;
  partNumberSetForProduction: number;
}

interface ReturnData {
  error?: {} | string;
  success?: string;
  editPartNumber?: {
    success: string;
    updatedCustomerData: {};
  };
  changeNotePost?: {
    success: string;
    changeNoteData: {};
  };
  updatedCustomerData?: {};
}

async function updatePartNumber(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };
  const {
    partNumberName,
    partNumberMaterial,
    partNumberSerialNumberRequired,
    partNumberSetForProduction
  } = request;
  let requestList = '';
  const modifyRequest: any = {
    partNumberName,
    partNumberMaterial,
    partNumberSerialNumberRequired,
    partNumberSetForProduction
  };
  // Setup Change note info to submit
  let changeNoteString = '';
  // Setup dbRequest with only changed information, none null
  const dbRequest: any = {};
  // Load only non-null values into new object
  // eslint-disable-next-line array-callback-return
  Object.keys(modifyRequest).map((key: any) => {
    if (modifyRequest[key] !== null) {
      dbRequest[key] = modifyRequest[key];
    }
  });
  // Setup string of key values to pass to the query string
  // Last index is setup so it doesn't end with a comma
  // eslint-disable-next-line array-callback-return
  Object.keys(dbRequest).map((key, index) => {
    const keyLastIndex = Object.keys(dbRequest).length - 1;
    if (index !== keyLastIndex) {
      requestList += `${key} = '${dbRequest[key]}', `;
      changeNoteString += `${key}, `;
    } else {
      // Remove comma on last indexed key for query
      requestList += `${key} = '${modifyRequest[key]}'`;
      changeNoteString += `${key}`;
    }
  });

  // Add Change Note History
  try {
    const db = await pool.connect();
    const query = `UPDATE partNumber
      SET ${requestList}
        OUTPUT INSERTED.id, GETDATE() as dateStamp, CURRENT_USER as UserName, HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser
          WHERE partNumberName = '${request.partNumberName}'`;
    const data = await db.query(query);

    // If part number add worked, then create the change note to show when part number was created
    if (data.recordset[0].id) {
      returnData.editPartNumber = {
        success: 'Success',
        updatedCustomerData: data
      };
      // Setup to add change note for adding part number.
      try {
        const postChangeNote: any = {
          typeID: data.recordset[0].id,
          typeCategory: 'partNumber',
          changeNoteDescription: `Edited Part Number: ${changeNoteString} `,
          // Store as a comma separated string for now.
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };

        const changeNoteData: any = await postNewChangeNote(postChangeNote);

        // If changeNote passes, then finally add a part number note if it has any text
        if (changeNoteData.changeNoteData.success === 'Success') {
          returnData.changeNotePost = {
            success: 'Success',
            changeNoteData
          };
        } else {
          returnData.changeNotePost = {
            success: 'Failed to add change note!',
            changeNoteData
          };
        }
      } catch (error) {
        returnData.error = error;
      }
    } else {
      returnData = {
        success: 'Failed to update part number!',
        updatedCustomerData: data,
        error: {
          empty: `Something went wrong on updating part number!`
        }
      };
    }
    return returnData;
  } catch (err) {
    returnData = {
      error: err
    };
    return returnData;
  }
}

export default updatePartNumber;
