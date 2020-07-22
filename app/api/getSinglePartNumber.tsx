/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';

interface Request {
  partNumberName: string;
}

interface List {
  push?: any;
  [index: number]: {
    changeNoteDateStamp: string;
    changeNoteID: number;
    typeCategory: string;
    userID: string;
    changeNoteDescription: string;
  };
}

interface ReturnData {
  error?: {};
  singlePartNumber?:
    | {
        id: number;
        partNumberName: string;
        partNumberMaterial: string;
        partNumberSerialNumberRequired: number;
        partNumberSetForProduction: number;
        changeNoteList?: {
          typeCategory: string;
          list: List;
        };
        success: string;
      }
    | {}
    | any;
  partNumberNotes?:
    | {
        noteList: {
          objId: number;
          changeNoteList: List;
        };
        error: string;
        success: string;
      }
    | {}
    | any;
}

interface Item {
  partNumberNoteID: number;
  noteText: string;
  changeNoteDateStamp: string;
  changeNoteID: number;
  typeCategory: string;
  userID: string;
  changeNoteDescription: string;
}

async function getSinglePartNumber(request: Request) {
  const returnData: ReturnData = {
    error: {}
  };

  try {
    const db = await pool.connect();
    const query = `
    SELECT p.id, p.partNumberName, p.partNumberMaterial, p.partNumberSerialNumberRequired, p.partNumberSetForProduction,
    n.changeNoteDateStamp, n.id AS changeNoteID, n.typeCategory, n.userID, n.changeNoteDescription
      FROM  partNumber as p
        RIGHT JOIN changeNote AS n
          ON p.id = n.typeID AND n.typeCategory = 'partNumber'
              WHERE (p.partNumberName = '${request.partNumberName}')
    `;
    const data = await db.query(query);
    // If the data is good for the start of if statement
    if (data.recordset.length > 0) {
      returnData.singlePartNumber = {
        id: data.recordset[0].id,
        partNumberName: data.recordset[0].partNumberName,
        partNumberMaterial: data.recordset[0].partNumberMaterial,
        partNumberSerialNumberRequired: data.recordset[0].partNumberSerialNumberRequired,
        partNumberSetForProduction: data.recordset[0].partNumberSetForProduction,
        changeNoteList: {
          typeCategory: data.recordset[0].typeCategory,
          list: []
        },
        success: 'Success'
      };

      data.recordset.forEach((item: Item) => {
        const listItem = {
          changeNoteDateStamp: item.changeNoteDateStamp,
          changeNoteID: item.changeNoteID,
          typeCategory: item.typeCategory,
          userID: item.userID,
          changeNoteDescription: item.changeNoteDescription
        };
        returnData.singlePartNumber.changeNoteList.list.push(listItem);
      });

      try {
        const noteQuery = `
        SELECT n.id AS partNumberNoteID, n.partNumberNoteText,
        c.changeNoteDateStamp, c.id AS changeNoteID, c.typeCategory, c.userID, c.changeNoteDescription
          FROM  partNumberNote AS n
            RIGHT JOIN changeNote AS c
              ON n.id = c.typeID AND c.typeCategory = 'partNumberNote'
                WHERE (n.partNumberID = ${data.recordset[0].id})
        `;
        const partNumberNoteData = await db.query(noteQuery);
        if (partNumberNoteData.recordset.length > 0) {
          returnData.partNumberNotes = {
            noteList: {},
            error: '',
            success: 'Success'
          };

          partNumberNoteData.recordset.forEach((item: Item) => {
            const objId = item.partNumberNoteID.toString();
            const changeNoteItem = {
              changeNoteDateStamp: item.changeNoteDateStamp,
              changeNoteID: item.changeNoteID,
              typeCategory: item.typeCategory,
              userID: item.userID,
              changeNoteDescription: item.changeNoteDescription
            };
            const note = {
              noteText: item.noteText,
              changeNoteList: []
            };

            if (returnData.partNumberNotes.noteList?.hasOwnProperty(objId)) {
              // eslint-disable-next-line prettier/prettier
              returnData.partNumberNotes.noteList[objId].changeNoteList.push(changeNoteItem);
            } else {
              returnData.partNumberNotes.noteList[objId] = note;
              // eslint-disable-next-line prettier/prettier
              returnData.partNumberNotes.noteList[objId].changeNoteList.push(changeNoteItem);
            }
          });
          returnData.partNumberNotes.success = 'Success';
        } else {
          returnData.partNumberNotes = {
            success: 'empty',
            noteList: partNumberNoteData.recordset,
            error: 'empty'
          };
        }
      } catch (error) {
        returnData.partNumberNotes = {
          success: 'false',
          noteList: {},
          error
        };
      }
    } else {
      returnData.singlePartNumber = {};
    }
    return returnData;
  } catch (err) {
    returnData.singlePartNumber = {};
    returnData.error = err;
    return returnData;
  }
}

export default getSinglePartNumber;
