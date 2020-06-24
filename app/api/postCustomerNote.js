import 'mssql/msnodesqlv8';
import pool from '../config/config';
import postNewChangeNote from './postChangeNote';

async function postCustomerNote(request) {
  console.log("Add Customer NOTE, Request: ", request);
//   let returnData = {};
//   // Post to add new customer
//   try {
//     const db = await pool.connect();
//     const query = `INSERT INTO customer (customerName, customerCodeName, customerGenStd, customerRsStd, customerActive)
//       OUTPUT inserted.id, GETDATE() as dateStamp, CURRENT_USER as UserName, HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser
//         VALUES (
//           '${request.customerName}', '${request.customerCodeName}', ${request.customerGenStatus}, ${request.customerRSStatus}, ${request.customerActive}
//           )`;

//     console.log("Data query for customer request ", query);
//     const data = await db.query(query);

//     console.log('config data request data', data);
//     console.log('test id ', data.recordset[0].id);
//     // If customer add worked, then create the change note to show when customer was created
//     if (data.recordset[0].id) {
//       // Setup to add change note for adding customer.
//       try {
//         const requestData = {
//           typeID: data.recordset[0].id,
//           typeCategory: 'customer',
//           changeNoteDescription: 'Added as a new customer',
//           // Store as a comma seperated string for now.
//           userId: `${data.recordset[0].LoggedInUser}`
//         }
//         console.log("Request Object for Add Customer Note", requestData);
//         const changeNoteData = await postNewChangeNote(requestData);
//         console.log("Return Change Note post request", changeNoteData);
//         returnData.customerNotePost = changeNoteData;
//         // TODO: Add CustomerNote post here
//       } catch (error) {
//         returnData.error = error;
//       }
//       returnData.data = data;
//       returnData.timeStamp = data.recordset[0].customerTimeStamp;
//       returnData.error = {};
//     } else {
//       returnData = {
//         data,
//         error: {
//           empty: `Something went wrong on adding customer`
//         }
//       };
//     }
//     return returnData;
//   } catch (err) {
//     returnData = {
//       error: err
//     };
//     return returnData;
//   }
}

module.exports = postCustomerNote;
