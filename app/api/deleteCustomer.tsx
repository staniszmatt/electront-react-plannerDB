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

interface CustomerSuccessChangeDeleteNote {
  success?: {
    data?: {};
    success?: string;
  };
  error?: {};
}

interface List {
  push?: any;
  [id: number]: {
    success: string;
    customerSuccessDeleteChangeNote: CustomerSuccessChangeDeleteNote;
  };
}

interface ReturnData {
  error?: {};
  success?: string;
  customerNoteDeleteSuccess?: List;
}

async function deleteCustomer(request: Request) {
  const returnData: ReturnData = {
    error: {}
  };

  /**
   * Deleting customer!
   * First delete customer note change notes
   * Then delete customer notes
   * After delete customer change notes
   * Last delete the customer
   */









////////////////////////////////////////////////////////////////////////////////



  // Deleting customer note change notes for each customer note ID.success
  const customerSuccessDeleteNote: CustomerSuccessDeleteNote = request.customerNoteIDList.map(
    async (value: number, _index: number) => {
      console.log('Note ID:', value);
      const noteID: string = value.toString();
      const customerSuccessDeleteChangeNote: CustomerSuccessChangeDeleteNote = {
        success: {},
        error: {}
      };
      try {
        const db = await pool.connect();
        const query = `DELETE changeNote
            WHERE id = ${value} AND typeCategory = 'customerNote'`;
        const data = await db.query(query);


        if (data) {
          customerSuccessDeleteChangeNote[noteID].success.success = 'Deleted Customer Note Change Notes.';
          customerSuccessDeleteChangeNote[noteID].success.data = data;


          // Delete the note here.
          try {

          } catch {

          }



        } else {
          customerSuccessDeleteChangeNote[noteID].success.success = 'Failed';
          customerSuccessDeleteChangeNote[noteID].success.data = data;
          customerSuccessDeleteChangeNote[noteID].error = {
            error: 'Error in deleting customer note, change notes.'
          };
        }




      } catch (err) {
        customerSuccessDeleteChangeNote[noteID].error = err;
        // returnData.customerNoteDeleteSuccess[noteID].customerSuccessDeleteChangeNote.push(customerSuccessDeleteChangeNote);
      };



      return customerSuccessDeleteChangeNote;
    }
  );









  // TODO: The End of the delete note section, Delete customer, Change notes and customer from here.

  return returnData;
}

export default deleteCustomer;
