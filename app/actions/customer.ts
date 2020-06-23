import { ipcRenderer } from 'electron';
import { GetCustomerState, Dispatch } from '../reducers/types';

export const CUSTOMER_PENDING = 'CUSTOMER_LIST_REQUEST';
export const CUSTOMER_ERROR = 'CUSTOMER_LIST_ERROR';
export const CUSTOMER_LIST_RECIEVED = 'CUSTOMER_LIST_RECIEVED';
export const CUSTOMER_ADD_PAGE = 'CUSTOMER_ADD_PAGE';

export function customerPending() {
  return {
    type: CUSTOMER_PENDING
  };
}

export function customerAddPageSelected() {
  return {
    type: CUSTOMER_ADD_PAGE
  };
}
// Setup resp:{} for typescript instead of making a how seperate file and folder
export function customerListRecieved(resp: {}) {
  return {
    type: CUSTOMER_LIST_RECIEVED,
    resp
  };
}

export function customerError(resp: {}) {
  return {
    type: CUSTOMER_ERROR,
    resp
  };
}

// Call to electron main with ipcRenderer to get server data for customer list
export function pullRequestCustomerListData() {
  return (dispatch: Dispatch) => {

    const mainRequest = {
      request: 'getCustomerList'
    };

    ipcRenderer.send('asynchronous-message', mainRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      console.log('customer data ', resp);
      console.log('custoemr data event', event);
      if (resp.list.length > 0){
        dispatch(customerListRecieved(resp));
      } else {
        dispatch(customerError(resp));
      }
    });
  };
}

// Setup for customer list call
export function requestCustomerList() {
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    console.log('action request customer list state', state);
    if (state.customer.customerList.length < 2) {
      dispatch(pullRequestCustomerListData());
    }
    if (state.customer.loadedCustomerListState) {
      return;
    }
  };
}

export function handleCustomerSearchForm(customerName: {}) {
  console.log('handle customer search action, check name: ', customerName);

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    // Stop repeating searches here
    if (state.customer.customerList.length === 1) {
      if (state.customer.customerList[0].customerName === customerName.customerSearch){
        return;
      }
    }
    const mainIPCRequest = {
      request: 'getSearchCustomer',
      customerName: `${customerName.customerSearch}`
    };

    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      console.log('customer search data ', resp);
      console.log('customer search data event', event);
      if (resp.list.length > 0){
        // Reusing the customer list display for displaying single customer
        dispatch(customerListRecieved(resp));
      } else if (resp.error.name === 'RequestError') {
        // If request isn't in the server
        dispatch(
          customerError({
            list: [],
            error: {
              customerName: `Customer has not been added, please add '${customerName.customerSearch}'`
            }
          })
        );
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
    });
  };
}

export function handleCustomerAddForm(customerToAdd: {}) {
  console.log("Handle customer Add Submit ", customerToAdd);

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();

    const mainIPCRequest = {
      request: 'postAddCustomer',
      customerName: `${customerToAdd.customerName}`,
      customerCodeName: `${customerToAdd.customerCodeName}`,
      customerGenStatus: `${customerToAdd.customerGenStatus}`,
      customerRSStatus: `${customerToAdd.customerRSStatus}`,
      customerActive: `${customerToAdd.customerActive}`,
      customerNote: `${customerToAdd.customerNote}`
    };

    console.log('add customer object to be sent', mainIPCRequest);

  //   ipcRenderer.send('asynchronous-message', mainIPCRequest);
  //   dispatch(customerPending());
  //   ipcRenderer.on('asynchronous-reply', (event, resp) => {
  //     console.log('customer search data ', resp);
  //     console.log('customer search data event', event);
  //     if (resp.list.length > 0){
  //       // Reusing the customer list display for displaying single customer
  //       dispatch(customerListRecieved(resp));
  //     } else if (resp.error.name === 'RequestError') {
  //       // If request isn't in the server
  //       dispatch(
  //         customerError({
  //           list: [],
  //           error: {
  //             customerName: `Customer has not been added, please add '${customerName.customerSearch}'`
  //           }
  //         })
  //       );
  //     } else {
  //       // If errors are not specified above, then pass whole error
  //       dispatch(customerError(resp));
  //     }
  //   });
  };
}
