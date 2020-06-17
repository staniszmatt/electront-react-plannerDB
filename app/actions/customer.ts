import { ipcRenderer } from 'electron';
import { GetCustomerState, Dispatch } from '../reducers/types';

export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';

export const CUSTOMER_LIST_REQUEST = 'CUSTOMER_LIST_REQUEST';
export const CUSTOMER_LIST_RECIEVED = 'CUSTOMER_LIST_RECIEVED';

export function listAllCustomers() {
  return {
    type: LIST_CUSTOMERS
  };
}

// Resp is example setup, need to setup for the strucured data
// Setup resp:{} for typescript instead of making a how seperate file and folder
export function customerListPending() {
  return {
    type: CUSTOMER_LIST_REQUEST
  };
}

export function customerListRecieved(resp: {}) {
  return {
    type: CUSTOMER_LIST_RECIEVED,
    resp
  };
}

// Call to get server for customer list
export function pullRequestCustomerListData() {
  return (dispatch: Dispatch) => {

    ipcRenderer.send('asynchronous-message', 'Request Customers!');
    dispatch(customerListPending());
    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      console.log('customer data ', resp);
      console.log('custoemr data event', event);

      dispatch(customerListRecieved(resp));
    });
  };
}
// Setup Order for customer list call
export function requestCustomerList() {
  console.log("request list action");
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    console.log('action request custoemr list state', state);
    if (state.customer.CustomerListItems.customerList.length === 0) {
      dispatch(pullRequestCustomerListData());
    }
    if (state.customer.DisplayCustomerList) {
      return;
    }
    dispatch(listAllCustomers());
  };
}
