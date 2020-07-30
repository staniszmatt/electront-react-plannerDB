/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';

interface Request {
  request: string;
  partNumberID: number;
  partNumberNoteIDList: [];
}

interface List {
  push?: any;
  [id: number]: {
    success: string;
    data: {};
    error: {};
    partNumberSuccessDeleteChangeNote: {
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
  partNumberNoteDeleteSuccess?: List | string | any;
  partNumberChangeNote?: {
    resp: {};
    success: string;
    error: {};
  } | any;
}

async function deletePartNumber(request: Request) {
  const returnData: ReturnData = {
    error: {},
    success: '',
    resp: {},
    partNumberNoteDeleteSuccess: {},
    partNumberChangeNote: {
      resp: {},
      success: '',
      error: {}
    }
  };



console.log('delete part number request', request)











  try {
    // Var for partNumberSuccessDeleteChangeNote on mapped delete notes
    const partNumberDeleteNotesResp = await Promise.all(
      request.partNumberNoteIDList.map(async (value: number) => {
        const partNumberNoteDeleteSuccess: any = {};
        const partNumberSuccessDeleteNote = {
          success: '',
          data: {},
          error: {},
          partNumberSuccessDeleteChangeNote: {
            success: {
              success: '',
              data: {}
            },
            error: {}
          }
        };




        const noteID = value.toString();
        // Create the object for each note in map function.
        partNumberNoteDeleteSuccess[noteID] = partNumberSuccessDeleteNote;



        // If there are notes, delete them, otherwise, send back that there were none to delete.
        if (request.partNumberNoteIDList.length > 0) {


          try {
            const db = await pool.connect();
            const deleteNoteChangeNoteQuery = `DELETE changeNote
                WHERE typeID = ${value} AND typeCategory = 'partNumberNote'`;
            const deleteNoteChangeNoteData = await db.query(deleteNoteChangeNoteQuery);





            if (deleteNoteChangeNoteData) {
              partNumberNoteDeleteSuccess[noteID].partNumberSuccessDeleteChangeNote.success.success = 'Success';
              partNumberNoteDeleteSuccess[noteID].partNumberSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;





              // Delete the note here.
              try {
                const deleteNoteQuery = `
                  DELETE partNumberNote
                    WHERE partNumberID = ${request.partNumberID}`;
                const deleteNoteData = await db.query(deleteNoteQuery);

                if (deleteNoteData.rowsAffected.length > 0) {
                  partNumberNoteDeleteSuccess[noteID].success = 'Success';
                  partNumberNoteDeleteSuccess[noteID].data = deleteNoteData;
                } else {
                  partNumberNoteDeleteSuccess[noteID].success = 'Failed';
                  partNumberNoteDeleteSuccess[noteID].data = deleteNoteData;
                }
              } catch (err) {
                partNumberNoteDeleteSuccess[noteID].success = 'Failed to delete partNumber note!';
                partNumberNoteDeleteSuccess[noteID].error = err;
              }
            } else {
              partNumberNoteDeleteSuccess[noteID].partNumberSuccessDeleteChangeNote.success.success = 'Failed to delete note, change notes.';
              partNumberNoteDeleteSuccess[noteID].partNumberSuccessDeleteChangeNote.success.data = deleteNoteChangeNoteData;
              partNumberNoteDeleteSuccess[noteID].partNumberSuccessDeleteChangeNote.error = {
                error: 'Something went wrong deleting the notes, change notes'
              };
            }
            return partNumberNoteDeleteSuccess;
          } catch (err) {
            partNumberNoteDeleteSuccess[noteID].error = {
              error: err,
              errorMsg: 'Something went wrong deleting part number!'
            };
            return partNumberNoteDeleteSuccess;
          }
        } else {
          partNumberNoteDeleteSuccess[noteID].error = {
            errorMsg: 'Something went wrong deleting part number!'
          };
          return partNumberNoteDeleteSuccess;
        }
      })
    );

    returnData.partNumberNoteDeleteSuccess = partNumberDeleteNotesResp;
    // Delete Part Number Change Notes Here
    if (partNumberDeleteNotesResp) {
      try {
        const db = await pool.connect();
        const deletePartNumberChangeNoteQuery = `DELETE changeNote
            WHERE typeID = ${request.partNumberID} AND typeCategory = 'partNumber'`;
        const deletePartNumberChangeNoteData: {} = await db.query(deletePartNumberChangeNoteQuery);

        if (deletePartNumberChangeNoteData) {
          returnData.partNumberChangeNote.success = 'Success';
          returnData.partNumberChangeNote.error = {};
          returnData.partNumberChangeNote.resp = deletePartNumberChangeNoteData;
          // Delete Part Number Here
          try {
            const deleteCustomerQuery = `
            DELETE partNumber
              WHERE id = ${request.partNumberID}`;
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
      errorMsg: 'delete part number error'
    }
    return returnData;
  }
  returnData.success = 'Failed';
  returnData.error = { error: 'Something went wrong deleting part number!'};
  return returnData;












}

export default deletePartNumber;
