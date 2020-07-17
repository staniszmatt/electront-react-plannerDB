/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import { ReactReduxContext } from 'react-redux';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

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
};

interface ReturnData {
  error?: {};
  success?: string;
  customerNoteDeleteSuccess?: List | string | any;
}

async function deleteCustomer(request: Request) {
  const returnData: ReturnData = {
    error: {},
    success: '',
    customerNoteDeleteSuccess: {}
  };

  console.log('Request Data: ', request);

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


        const customerNoteDeleteSuccess = {};
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

        console.log('Note ID:', value);
        const noteID = value.toString();
        // Create the object for each note in map function.
        customerNoteDeleteSuccess[noteID] = customerSuccessDeleteNote;

        console.log('start of return data delete note', returnData);
        // If there are notes, delete them, otherwise, send back that there were none to delete.
        if (request.customerNoteIDList.length > 0) {
          try {
            const db = await pool.connect();
            const deleteNoteChangeNoteQuery = `DELETE changeNote
                WHERE typeID = ${value} AND typeCategory = 'customerNote'`;
            const deleteNoteChangeNoteData = await db.query(deleteNoteChangeNoteQuery);
            console.log('customer delete note return data for change notes', deleteNoteChangeNoteData);

            if (deleteNoteChangeNoteData) {
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Success';
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
              console.log('return data delete change notes', customerNoteDeleteSuccess);
              // Delete the note here.
              try {
                const deleteNoteQuery = `
                  DELETE customerNote
                    WHERE customerID = ${request.customerID}`;
                const deleteNoteData = await db.query(deleteNoteQuery);
                console.log('delete note data', deleteNoteData);
                if (deleteNoteData.rowsAffected.length > 0) {
                  customerNoteDeleteSuccess[noteID].success = 'Success';
                  customerNoteDeleteSuccess[noteID].data = deleteNoteData;

                  console.log('delete customer note final return data', customerNoteDeleteSuccess);

                } else {
                  customerNoteDeleteSuccess[noteID].success = 'Failed';
                  customerNoteDeleteSuccess[noteID].data = deleteNoteData;
                  console.log('delete customer note final return data error', customerNoteDeleteSuccess);
                }
              } catch (err) {
                customerNoteDeleteSuccess[noteID].success = 'Failed to delete customer note!';
                customerNoteDeleteSuccess[noteID].error = err;
                console.log('delete customer note final return data error', customerNoteDeleteSuccess);
              }
            } else {
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Failed to delete note, change notes.';
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
              customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.error = {
                error: 'Something went wrong deleting the notes, change notes'
              };
              console.log('delete customer note  return change note data error', customerNoteDeleteSuccess);
            }
            console.log("final return customer note data", customerNoteDeleteSuccess)
            return customerNoteDeleteSuccess;
          } catch (err) {
            console.log('Main error ', err);
            customerNoteDeleteSuccess[noteID].error = {
              error: err,
              errorMsg: 'Something went wrong deleting customer!'
            };
            console.log('delete customer note  note data error', customerNoteDeleteSuccess);
            return customerNoteDeleteSuccess;
            // returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.push(customerSuccessDeleteChangeNote);
          }
        } else {
          console.log('final map error ');
          customerNoteDeleteSuccess[noteID].error = {
            error: err,
            errorMsg: 'Something went wrong deleting customer!'
          };
          console.log('delete customer note  note data error', customerNoteDeleteSuccess);
          return customerNoteDeleteSuccess;
        }
      })
    );

    returnData.customerNoteDeleteSuccess = customerDeleteNotesResp;

    if (customerDeleteNotesResp) {

      return returnData;
    }
  } catch (err) {
    returnData.error = {
      error: err,
      errorMsg: 'delete customer error'
    }
    console.log("error!", err)
    return returnData;
  }
}

export default deleteCustomer;
