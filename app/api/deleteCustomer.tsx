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

  console.log("REquest ", request);

  /**
   * Deleting customer!
   * First delete customer note change notes
   * Then delete customer notes
   * After delete customer change notes
   * Last delete the customer
   */

  // If there are notes, delete them, otherwise, send back that there were none to delete.
  if (request.customerNoteIDList.length > 0) {
    request.customerNoteIDList.map(async (value: number, _index: number) => {
      // Stop if note list is empty!
      console.log('Note ID:', value);
      const noteID = value.toString();



      // Create the object for each note in map function.
      returnData.customerNoteDeleteSuccess[noteID] = customerSuccessDeleteNote;

      console.log('start of return data delete note', returnData);

      try {
        const db = await pool.connect();
        const deleteNoteChangeNoteQuery = `DELETE changeNote
            WHERE typeID = ${value} AND typeCategory = 'customerNote'`;
        const deleteNoteChangeNoteData = await db.query(deleteNoteChangeNoteQuery);
        console.log('customer delete note return data for change notes', deleteNoteChangeNoteData);

        if (deleteNoteChangeNoteData) {
          returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Success';
          returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
          console.log('return data delete change notes', returnData);
          // Delete the note here.
          try {
            const deleteNoteQuery = `
              DELETE customerNote
                WHERE customerID = ${request.customerID}`;
            const deleteNoteData = await db.query(deleteNoteQuery);
            console.log('delete note data', deleteNoteData);
            if (deleteNoteData.rowsAffected.length > 0) {
              returnData.customerNoteDeleteSuccess[noteID].success = 'Success';
              returnData.customerNoteDeleteSuccess[noteID].data = deleteNoteData;

              console.log('delete customer note final return data', returnData);

            } else {
              returnData.customerNoteDeleteSuccess[noteID].success = 'Failed';
              returnData.customerNoteDeleteSuccess[noteID].data = deleteNoteData;
              console.log('delete customer note final return data error', returnData);
            }
          } catch (err) {
            returnData.customerNoteDeleteSuccess[noteID].success = 'Failed to delete customer note!';
            returnData.customerNoteDeleteSuccess[noteID].error = err;
            console.log('delete customer note final return data error', returnData);
          }
        } else {
          returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.success = 'Failed to delete note, change notes.';
          returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
          returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.error = {
            error: 'Something went wrong deleting the notes, change notes'
          };
          console.log('delete customer note  return change note data error', returnData);
        }
      } catch (err) {
        console.log('Main error ', err);
        returnData.error = {
          error: err,
          errorMsg: 'Something went wrong deleting customer!'
        };
        console.log('delete customer note  note data error', returnData);
        // returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.push(customerSuccessDeleteChangeNote);
      }
    });
  } else {
    returnData.customerNoteDeleteSuccess = 'No note to delete.';
    console.log('first returndata return error', returnData);
  }

  // Deleting customer note change notes for each customer note ID.success


  // TODO: The End of the delete note section, Delete customer, Change notes and customer from here.
  console.log(" Ending Return Data", returnData);
  return returnData;

}

export default deleteCustomer;
