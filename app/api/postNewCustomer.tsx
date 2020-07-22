/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postCustomerNote from './postCustomerNote';
import postNewChangeNote from './postChangeNote';

interface Request {
  customerName: string;
  customerCodeName: string;
  customerGenStatus: number;
  customerRSStatus: number;
  customerActive: number;
  customerNote: string;
}

interface ReturnData {
  error?: {} | any;
  success?: string;
  changeNotePost?: {
    success: string;
    changeNoteData: {};
  };
  customerNote?: {
    success: string;
    customerNoteData: {};
  };
  newCustomer?: {
    success: string;
    newCustomerData: {};
    error: {} | string;
  };
}

async function postNewCustomer(request: Request) {
  let returnData: ReturnData = {
    error: {}
  };
  // Post to add new customer
  try {
    const db = await pool.connect();
    const query = `INSERT INTO customer (customerName, customerCodeName, customerGenStd, customerRsStd, customerActive)
      OUTPUT inserted.id, GETDATE() as dateStamp, CURRENT_USER as UserName, HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser
        VALUES (
          '${request.customerName}', '${request.customerCodeName}', ${request.customerGenStatus}, ${request.customerRSStatus}, ${request.customerActive}
          )`;
    const data = await db.query(query);
    // If customer add worked, then create the change note to show when customer was created
    if (data.recordset[0].id) {
      // Setup to add change note for adding customer.
      try {
        const requestData: any = {
          typeID: data.recordset[0].id,
          typeCategory: 'customer',
          changeNoteDescription: 'Added as a new customer',
          // Store as a comma separated string for now.
          userId: `${data.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${data.recordset[0].dateStamp}`
        };
        const changeNoteData: any = await postNewChangeNote(requestData);
        // If changeNote passes, then finally add a customer note if it has any text
        if (changeNoteData.changeNoteData.success === 'Success') {
          returnData.changeNotePost = {
            success: 'Success',
            changeNoteData
          };
          if (request.customerNote !== 'undefined') {
            try {
              const requestCustomerNoteData = {
                customerNote: request.customerNote,
                customerID: data.recordset[0].id,
                // eslint-disable-next-line prettier/prettier
                changeNoteDescription: "Added customer note with adding a new customer."
              };
              // eslint-disable-next-line prettier/prettier
              const customerNoteData: any = await postCustomerNote(requestCustomerNoteData);
              if (customerNoteData.customerNoteData.success === 'Success') {
                returnData.customerNote = {
                  success: 'Success',
                  customerNoteData
                };
              } else {
                returnData.customerNote = {
                  success: 'Failed to add customer note!',
                  customerNoteData
                };
              }
            } catch (error) {
              returnData.error = error;
            }
          }
        } else {
          returnData.changeNotePost = {
            success: 'Failed to add change note!',
            changeNoteData
          };
        }
      } catch (error) {
        returnData.error = error;
      }
      returnData.newCustomer = {
        success: 'Success',
        newCustomerData: data,
        error: {}
      };
    } else {
      returnData.newCustomer = {
        success: 'Failed to add customer!',
        newCustomerData: data,
        error: {
          empty: `Something went wrong on adding customer`
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

export default postNewCustomer;
