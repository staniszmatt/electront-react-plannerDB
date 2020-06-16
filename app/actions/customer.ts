import { GetCustomerState, Dispatch } from '../reducers/types';
import { ipcRenderer } from 'electron';
export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';

export const REQUEST_CUSTOMER_LIST = 'REQUEST_CUSTOMER_LIST';
export const RECIEVED_CUSTOMER_LIST = 'RECIEVED_CUSTOMER_LIST';
export const ERROR_CUSTOMER_LIST = 'ERROR_CUSTOMER_LIST';
export const SELECT_CUSTOMER_LIST = 'SELECT_CUSTOMER_LIST';
// export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
// export const ADD_CUSTOMER = 'ADD_CUSTOMER';
// export const SEARCH_CUSTOMER = 'SEARCH_CUSTOMER';

export function listAllCustomers() {
  return {
    type: LIST_CUSTOMERS
  };
}

export function selectCustomerList(response) {
  return {
    type: SELECT_CUSTOMER_LIST,
    response
  }
}

export function requestCustomerList(response) {
  return {
    type: REQUEST_CUSTOMER_LIST,
    response
  };
}

export function errorCustomerList(response) {
  return {
    type: ERROR_CUSTOMER_LIST,
    response,
    error
  };
}

export function receivedCustomerList(response, json) {
  console.log("recived data aaction", json);
  console.log("test portion", response);
  return {
    type: RECIEVED_CUSTOMER_LIST,
    response,
    posts: json
  }
}



// export function editCustomer() {
//   return {
//     type: EDIT_CUSTOMER
//   };
// }

// export function addACustomer() {
//   return {
//     type: ADD_CUSTOMER
//   };
// }

// export function searchACustomer() {
//   return {
//     type: SEARCH_CUSTOMER
//   };
// }

export function getCustomerListPosts(response) {
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    dispatch(requestCustomerList(response));

    const requestData = { testRequestString: 'Request Customers!' };
    ipcRenderer.send('asynchronous-message', requestData);

    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      // console.log("getCustomer: Pull Data", resp);
      console.log('customer data ', resp);
      dispatch(receivedCustomerList(resp, event));
    });
  };
}
