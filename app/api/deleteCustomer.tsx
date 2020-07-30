/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';

interface Request {
  request: string;
  customerID: number;
  customerNoteIDList: [];
}

interface List {
  push?: any;
  [id: number]: {
    success: string;
    data: {};
    error: {};
    customerSuccessDeleteChangeNote: {
      success?: {
        data?: {};
        success?: string;
      };
      error?: {};
    };
  };
}

interface ReturnData {
  error?: {};
  success?: string;
  resp: {};
  customerNoteDeleteSuccess?: List | string | any;
  customerChangeNote?: {
    resp: {};
    success: string;
    error: {};
  } | any;
}

async function deleteCustomer(request: Request) {
  const returnData: ReturnData = {
    error: {},
    success: '',
    resp: {},
    customerNoteDeleteSuccess: {},
    customerChangeNote: {
      resp: {},
      success: '',
      error: {}
    }
  };

  /**
   * Deleting customer!
   * First delete customer note change notes
   * Then delete customer notes
   * After delete customer change notes
   * Last delete the customer
   */

  try {
    // Var for customerSuccessDeleteChangeNote on mapped delete notes
    const customerDeleteNotesResp = await Promise.all(
      request.customerNoteIDList.map(async (value: number) => {
        const customerNoteDeleteSuccess: any = {};
        const customerSuccessDeleteNote = {
          success: '',
          data: {},
          error: {},
          customerSuccessDeleteChangeNote: {
            success: {
              success: '',
              data: {}
            },
            error: {}
          }
        };

        const noteID = value.toString();
        // Create the object for each note in map function.
        customerNoteDeleteSuccess[noteID] = customerSuccessDeleteNote;

        // If there are notes, delete them, otherwise, send back that there were none to delete.
        if (request.customerNoteIDList.length > 0) {
          try {
            const db = await pool.connect();
            const deleteNoteChangeNoteQuery = `DELETE changeNote
                WHERE typeID = ${value} AND typeCategory = 'customerNote'`;
            const deleteNoteChangeNoteData = await db.query(deleteNoteChangeNoteQuery);

            if (deleteNoteChangeNoteData) {
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Success';
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;

              // Delete the note here.
              try {
                const deleteNoteQuery = `
                  DELETE customerNote
                    WHERE customerID = ${request.customerID}`;
                const deleteNoteData = await db.query(deleteNoteQuery);

                if (deleteNoteData.rowsAffected.length > 0) {
                  customerNoteDeleteSuccess[noteID].success = 'Success';
                  customerNoteDeleteSuccess[noteID].data = deleteNoteData;
                } else {
                  customerNoteDeleteSuccess[noteID].success = 'Failed';
                  customerNoteDeleteSuccess[noteID].data = deleteNoteData;
                }
              } catch (err) {
                customerNoteDeleteSuccess[noteID].success = 'Failed to delete customer note!';
                customerNoteDeleteSuccess[noteID].error = err;
              }
            } else {
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Failed to delete note, change notes.';
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.error = {
                error: 'Something went wrong deleting the notes, change notes'
              };
            }
            return customerNoteDeleteSuccess;
          } catch (err) {
            customerNoteDeleteSuccess[noteID].error = {
              error: err,
              errorMsg: 'Something went wrong deleting customer!'
            };
            return customerNoteDeleteSuccess;
          }
        } else {
          customerNoteDeleteSuccess[noteID].error = {
            errorMsg: 'Something went wrong deleting customer!'
          };
          return customerNoteDeleteSuccess;
        }
      })
    );

    returnData.customerNoteDeleteSuccess = customerDeleteNotesResp;
    // Delete Customer Change Notes Here
    if (customerDeleteNotesResp) {
      try {
        const db = await pool.connect();
        const deleteCustomerChangeNoteQuery = `DELETE changeNote
            WHERE typeID = ${request.customerID} AND typeCategory = 'customer'`;
        const deleteCustomerChangeNoteData: {} = await db.query(deleteCustomerChangeNoteQuery);

        if (deleteCustomerChangeNoteData) {
          returnData.customerChangeNote.success = 'Success';
          returnData.customerChangeNote.error = {};
          returnData.customerChangeNote.resp = deleteCustomerChangeNoteData;
          // Delete Customer Here
          try {
            const deleteCustomerQuery = `
            DELETE customer
              WHERE id = ${request.customerID}`;
            const deleteCustomerData = await db.query(deleteCustomerQuery);
            if (deleteCustomerData) {
              returnData.success = 'Success';
              returnData.resp = deleteCustomerData;
              return returnData;
            }
          } catch (err) {
            returnData.error = err;
            returnData.success = 'Failed';
            return returnData;
          }
        }
      } catch (err) {
        returnData.error = err;
      }
    }
  } catch (err) {
    returnData.error = {
      error: err,
      errorMsg: 'delete customer error'
    }
    return returnData;
  }
  returnData.success = 'Failed';
  returnData.error = { error: 'Something went wrong deleting customer!'};
  return returnData;
}

export default deleteCustomer;
