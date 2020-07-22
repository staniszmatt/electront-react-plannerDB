/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postPartNumberNote from './postPartNumberNote';
import postNewChangeNote from './postChangeNote';

interface Request {
  partNumberMaterial: string;
  partNumberName: string;
  partNumberSerialNumberRequired: number;
  partNumberSetForProduction: number;
  request: string;
  partNumberNoteText: string;
}

interface ReturnData {
  partNumberNoteText: {
    success: string;
    partNumberNoteData: {};
    error?: {};
  };
  partNumberChangeNote: {
    success: string;
    changeNoteData: {};
    error?: {} | any;
  };
  partNumberAdd: {
    success: string;
    newPartNumberData: {};
    error: {};
  };
}

async function postNewPartNumber(request: Request) {
  const returnData: ReturnData = {
    partNumberNoteText: {
      success: '',
      partNumberNoteData: {},
      error: {}
    },
    partNumberChangeNote: {
      success: '',
      changeNoteData: {},
      error: {}
    },
    partNumberAdd: {
      success: '',
      newPartNumberData: {},
      error: {}
    }
  };

  // Post to add new part number
  try {
    const db = await pool.connect();
    const query = `INSERT INTO partNumber (partNumberName, partNumberMaterial, partNumberSerialNumberRequired, partNumberSetForProduction)
    OUTPUT inserted.id, GETDATE() as dateStamp, CURRENT_USER as UserName, HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser
      VALUES (
          '${request.partNumberName}', '${request.partNumberMaterial}', ${request.partNumberSerialNumberRequired}, ${request.partNumberSetForProduction}
          )`;
    const postPartNumberRespData = await db.query(query);

    // If adding part number worked, then create the change note to show when the part number was created
    if (postPartNumberRespData.recordset[0].id) {
      // Post change note for adding part number
      returnData.partNumberAdd.success = 'Success';
      returnData.partNumberAdd.newPartNumberData = postPartNumberRespData;

      try {
        const requestData: any = {
          typeID: postPartNumberRespData.recordset[0].id,
          typeCategory: 'partNumber',
          changeNoteDescription: 'Added New Part Number',
          // Store as a comma separated string for now.
          userId: `${postPartNumberRespData.recordset[0].LoggedInUser}`,
          changeNoteDateStamp: `${postPartNumberRespData.recordset[0].dateStamp}`
        };
        const changeNoteData: any = await postNewChangeNote(requestData);

        // If changeNote passes, then finally add the part number note if it has any text
        if (changeNoteData.changeNoteData.success === 'Success') {
          returnData.partNumberChangeNote = {
            success: 'Success',
            changeNoteData
          };

          if (request.partNumberNoteText !== 'undefined') {
            try {
              const requestPartNumberNoteData = {
                partNumberNoteText: request.partNumberNoteText,
                partNumberID: postPartNumberRespData.recordset[0].id,
                // eslint-disable-next-line prettier/prettier
                changeNoteDescription: "Added part number note with adding the new part number."
              };

              // eslint-disable-next-line prettier/prettier
              const partNumberNoteData: any = await postPartNumberNote(requestPartNumberNoteData);

              console.log('PartNumberData', partNumberNoteData);

              if (partNumberNoteData.partNumberNoteData.success === 'Success') {
                returnData.partNumberNoteText.success = 'Success';
                returnData.partNumberNoteText.partNumberNoteData = partNumberNoteData;
              } else {
                returnData.partNumberNoteText = {
                  success: 'May have failed to add part number note!',
                  partNumberNoteData
                };
              }
            } catch (error) {
              returnData.partNumberNoteText.error = error;
            }
          }
        } else {
          returnData.partNumberChangeNote.success = 'Failed to add change note!';
          returnData.partNumberChangeNote.changeNoteData = changeNoteData;
          returnData.partNumberChangeNote.error = {
            errorMsg: 'Something went wrong adding part number change note!'
          };
        }
      } catch (err) {
        returnData.partNumberChangeNote.success = 'Failed';
        returnData.partNumberChangeNote.error = err;
      }
    } else {
      returnData.partNumberAdd.success = 'May have failed to add part number!';
      returnData.partNumberAdd.newPartNumberData = postPartNumberRespData;
      returnData.partNumberAdd.error = {
        empty: `Something may have went wrong adding the part number!`
      };
    }
    return returnData;
  } catch (err) {
    returnData.partNumberAdd.success = 'Failed';
    returnData.partNumberAdd.error = err;
    return returnData;
  }
}

export default postNewPartNumber;
