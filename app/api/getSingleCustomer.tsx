/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'mssql/msnodesqlv8';
import pool from '../config/config';

interface Request {
  customerName: string;
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
  customer?:
    | {
        id: number;
        customerName: string;
        customerActive: number;
        customerCodeName: string;
        customerGenStd: number;
        customerRsStd: number;
        changeNoteList?: {
          typeCategory: string;
          list: List;
        };
        success: string;
      }
    | {}
    | any;
  customerNotes?:
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
  customerNoteID: number;
  customerNoteText: string;
  changeNoteDateStamp: string;
  changeNoteID: number;
  typeCategory: string;
  userID: string;
  changeNoteDescription: string;
}

async function singleCustomer(request: Request) {
  const returnData: ReturnData = {
    error: {}
  };

  try {
    const db = await pool.connect();
    const query = `
      SELECT c.id, c.customerName, c.customerCodeName, c.customerGenStd, c.customerRsStd, c.customerActive,
      n.changeNoteDateStamp, n.id AS changeNoteID, n.typeCategory, n.userID, n.changeNoteDescription
        FROM  customer as c
          RIGHT JOIN changeNote AS n
            ON c.id = n.typeID AND n.typeCategory = 'customer'
              WHERE (c.customerName = '${request.customerName}')
    `;
    const data = await db.query(query);
    // If the data is good for the start of if statement
    if (data.recordset.length > 0) {
      returnData.customer = {
        id: data.recordset[0].id,
        customerName: data.recordset[0].customerName,
        customerActive: data.recordset[0].customerActive,
        customerCodeName: data.recordset[0].customerCodeName,
        customerGenStd: data.recordset[0].customerGenStd,
        customerRsStd: data.recordset[0].customerRsStd,
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
        returnData.customer.changeNoteList.list.push(listItem);
      });

      try {
        const noteQuery = `
          SELECT n.id AS customerNoteID, n.customerNoteText,
          c.changeNoteDateStamp, c.id AS changeNoteID, c.typeCategory, c.userID, c.changeNoteDescription
            FROM  customerNote AS n
              RIGHT JOIN changeNote AS c
                ON n.id = c.typeID AND c.typeCategory = 'customerNote'
                  WHERE (n.customerID = ${data.recordset[0].id})
        `;
        const customerNoteData = await db.query(noteQuery);
        if (customerNoteData.recordset.length > 0) {
          returnData.customerNotes = {
            noteList: {},
            error: '',
            success: 'Success'
          };

          customerNoteData.recordset.forEach((item: Item) => {
            const objId = item.customerNoteID.toString();
            const changeNoteItem = {
              changeNoteDateStamp: item.changeNoteDateStamp,
              changeNoteID: item.changeNoteID,
              typeCategory: item.typeCategory,
              userID: item.userID,
              changeNoteDescription: item.changeNoteDescription
            };
            const customerNote = {
              noteText: item.customerNoteText,
              changeNoteList: []
            };

            if (returnData.customerNotes.noteList?.hasOwnProperty(objId)) {
              // eslint-disable-next-line prettier/prettier
              returnData.customerNotes.noteList[objId].changeNoteList.push(changeNoteItem);
            } else {
              returnData.customerNotes.noteList[objId] = customerNote;
              // eslint-disable-next-line prettier/prettier
              returnData.customerNotes.noteList[objId].changeNoteList.push(changeNoteItem);
            }
          });
          returnData.customerNotes.success = 'Success';
        } else {
          returnData.customerNotes = {
            success: 'empty',
            noteList: customerNoteData.recordset,
            error: 'empty'
          };
        }
      } catch (error) {
        returnData.customerNotes = {
          success: 'false',
          noteList: {},
          error
        };
      }
    } else {
      returnData.customer = {};
    }
    return returnData;
  } catch (err) {
    returnData.customer = {};
    returnData.error = err;
    return returnData;
  }
}

export default singleCustomer;
