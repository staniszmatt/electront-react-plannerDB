import { ipcRenderer } from 'electron';
import { GetCustomerState, Dispatch } from '../reducers/types';

// export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';

export const CUSTOMER_LIST_REQUEST = 'CUSTOMER_LIST_REQUEST';
export const CUSTOMER_LIST_RECIEVED = 'CUSTOMER_LIST_RECIEVED';
export const CUSTOMER_LIST_ERROR = 'CUSTOMER_LIST_ERROR';

// export function listAllCustomers() {
//   return {
//     type: LIST_CUSTOMERS
//   };
// }

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

export function customerListError(resp: {}) {
  return {
    type: CUSTOMER_LIST_ERROR,
    resp
  };
}

// Call to electron main with ipcRenderer to get server data for customer list
export function pullRequestCustomerListData() {
  return (dispatch: Dispatch) => {

    ipcRenderer.send('asynchronous-message', 'Request Customers!');
    // TODO: Function to set state for loading screen
    dispatch(customerListPending());
    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      console.log('customer data ', resp);
      console.log('custoemr data event', event);
      if (resp.list.length > 0){
        dispatch(customerListRecieved(resp));
      } else {
        dispatch(customerListError(resp));
      }
    });
  };
}
// Setup Order for customer list call
export function requestCustomerList() {
  console.log("request list action");
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    console.log('action request custoemr list state', state);
    if (state.customer.customerList.length === 0) {
      dispatch(pullRequestCustomerListData());
    }
    if (state.customer.loadedState) {
      return;
    }
  };
}
