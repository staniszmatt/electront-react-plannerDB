// // TODO: Setup types for customer
// import {Dispatch, GetCustomerState, GetState} from '../reducers/customerTypes';
// //ipcRender to call to electron main and request the server infor instead of axios
// import { ipcRenderer } from 'electron';
// // import { type } from '@babel/core';


// export const SHOW_CUSTOMERS = 'SHOW_CUSTOMERS';
// export const ADD_CUSTOMER = 'ADD_CUSTOMER';

// export function showAllCustomers() {
//   console.log("Show Customers action" );



//   return (dispatch: Dispatch, getState: GetState) => {
//     const { customers } = getState();
//     console.log("Current Customers State", customers);


//     const requestData = {
//       testRequestString: "Request Customers!"
//     };
//     ipcRenderer.send('asynchronous-message', requestData);

//     ipcRenderer.on('asynchronous-reply', (event, resp) => {
//       console.log("getCustomer: Pull Data", resp);

//       dispatch({
//         type: SHOW_CUSTOMERS,
//         customers: resp
//       });
//     });
//   };

//   // return {
//   //   type: SHOW_CUSTOMERS
//   // };
// }

// export function addCustomer() {
//   console.log("Add customer action");
//   return {
//     type: ADD_CUSTOMER
//   };
// }
