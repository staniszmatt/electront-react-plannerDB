import { ipcRenderer } from 'electron';
import { GetCustomerState, Dispatch } from '../reducers/types';

export const CUSTOMER_LIST_REQUEST = 'CUSTOMER_LIST_REQUEST';
export const CUSTOMER_LIST_RECIEVED = 'CUSTOMER_LIST_RECIEVED';
export const CUSTOMER_LIST_ERROR = 'CUSTOMER_LIST_ERROR';
export const CUSTOMER_SEARCH_SCREEN = 'CUSTOMER_SEARCH_SCREEN';


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

export function customerListSearchSet() {
  return {
    type: CUSTOMER_SEARCH_SCREEN
  };
}

// Check if search is already selected
export function searchForCustomer() {
  console.log("search customer btn clicked");

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    console.log('action request custoemr list state', state);
    if (state.customer.searchCustomerState) {
      return;
    }
    dispatch(customerListSearchSet());
  };
}

// Call to electron main with ipcRenderer to get server data for customer list
export function pullRequestCustomerListData() {
  return (dispatch: Dispatch) => {

    const mainRequest = {
      request: 'getCustomerList'
    };

    ipcRenderer.send('asynchronous-message', mainRequest);
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

export function handleCustomerSearchForm(customerName: {}) {
  console.log('handle customer search action, check name: ', customerName);
  // return (dispatch: Dispatch, getState: GetCustomerState) => {
  //   const state = getState();
  //   console.log('action request custoemr list state', state);
  //   if (state.customer.customerList.length === 0) {
  //     dispatch(pullRequestCustomerListData());
  //   }
  //   if (state.customer.loadedState) {
  //     return;
  //   }
  // };
}
