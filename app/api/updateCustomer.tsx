import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postCustomerNote from './postCustomerNote';
import postNewChangeNote from './postChangeNote';
import isObjEmpty from '../helpFunctions/isObjEmpty';

async function updateCustomer(request) {
  let returnData = {
    error: {}
  };
  let requestList = '';
  const modifyRequest = {
    customerGenStd: request.customerGenStd,
    customerActive: request.customerActive,
    customerRsStd: request.customerRsStd,
    customerCodeName: request.customerCodeName
  };
  // Setup Change note info to submit
  let changeNoteString = '';
  // Setup dbRequest with only changed information, none null
  const dbRequest = {};
  // Load only non-null values into new object
  Object.keys(modifyRequest).map(key => {
    if (modifyRequest[key] !== null) {
      dbRequest[key] = modifyRequest[key];
    }
  });
  // Setup string of key values to pass to the query string
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
    const query = `UPDATE customer
      SET ${requestList}
        OUTPUT INSERTED.id, GETDATE() as dateStamp, CURRENT_USER as UserName, HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser
          WHERE customerName = '${request.customerName}'`;

    const data = await db.query(query);

    // If customer add worked, then create the change note to show when customer was created
    if (data.recordset[0].id) {
      returnData.editCustomer = {
        success: 'Success',
        updatedCustomerData: data
      };
      // Setup to add change note for adding customer.
      try {
        const postChangeNote = {
          typeID: data.recordset[0].id,
          typeCategory: 'customer',
          changeNoteDescription: `Edited Customer: ${changeNoteString} `,
          // Store as a comma seperated string for now.
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };

        const changeNoteData = await postNewChangeNote(postChangeNote);

        // If changeNote passes, then finally add a customer note if it has any text
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
        success: 'Failed to update customer!',
        updatedCustomerData: data,
        error: {
          empty: `Something went wrong on updating customer`
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

export default updateCustomer;
