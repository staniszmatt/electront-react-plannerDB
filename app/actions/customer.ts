import { ipcRenderer } from 'electron';
import { reset } from 'redux-form';
import { GetCustomerState, Dispatch } from '../reducers/types';
import { toggleOpenModalState } from './errorModal';
import isObjEmpty from '../helpFunctions/isObjEmpty';

export const CUSTOMER_PENDING = 'CUSTOMER_PENDING';
export const CUSTOMER_ERROR = 'CUSTOMER_LIST_ERROR';
export const CUSTOMER_LIST_RECIEVED = 'CUSTOMER_LIST_RECIEVED';
export const CUSTOMER_ADD_PAGE = 'CUSTOMER_ADD_PAGE';

// Helper Functions
function returnOneZeroFromString(stringToCheck: string) {
  if (stringToCheck === 'yes') {
    return 1;
  }
  return 0;
}

// Reducer function calls
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
  debugger;
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
  debugger
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
  debugger;
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
        // TODO: need to setup for a seperate customer display page to include notes and change history
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
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    // Setting yes no values as a boolean number 1 or 0
    const returnGenStatus = returnOneZeroFromString(
      customerToAdd.customerGenStatus
    );
    const returnRSStatus = returnOneZeroFromString(
      customerToAdd.customerRSStatus
    );
    const returnActiveStatus = returnOneZeroFromString(
      customerToAdd.customerActive
    );
    const mainIPCRequest = {
      request: 'postAddCustomer',
      customerName: `${customerToAdd.customerName}`,
      customerCodeName: `${customerToAdd.customerCodeName}`,
      customerGenStatus: returnGenStatus,
      customerRSStatus: returnRSStatus,
      customerActive: returnActiveStatus,
      customerNote: `${customerToAdd.customerNote}`
    };

    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log('return event', event);
      if (isObjEmpty(arg.error)) {
        // TODO: Setup response function here to chagne to the customer dispaly page once setup:
        dispatch(reset('customerSearchForm'));
      } else if (arg.error.number === 2627) {
        dispatch(
          toggleOpenModalState('Error Customer or code name already used!')
        );
        dispatch(customerAddPageSelected());
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(arg));
      }
    });
  };
}
