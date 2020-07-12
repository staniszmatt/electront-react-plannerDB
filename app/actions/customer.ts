/* eslint-disable prettier/prettier */
import { ipcRenderer } from 'electron';
import { reset } from 'redux-form';
import { GetCustomerState, Dispatch } from '../reducers/types';
import {
  toggleErrorModalState,
  toggleSuccessModalState
} from './modal';
import isObjEmpty from '../helpFunctions/isObjEmpty';

export const CUSTOMER_PENDING = 'CUSTOMER_PENDING';
export const CUSTOMER_PENDING_OFF = 'CUSTOMER_PENDING_OFF'
export const CUSTOMER_ERROR = 'CUSTOMER_ERROR';
export const CUSTOMER_LIST_RECEIVED = 'CUSTOMER_LIST_RECEIVED';
export const CUSTOMER_ADD_PAGE = 'CUSTOMER_ADD_PAGE';
export const CUSTOMER_SINGLE_PAGE = 'CUSTOMER_SINGLE_PAGE';
export const CUSTOMER_EDIT_PAGE = 'CUSTOMER_EDIT_PAGE';

// Helper Functions
function returnOneZeroFromString(stringToCheck: string) {
  if (stringToCheck === null) {
    return null;
  }
  if (stringToCheck === 'yes') {
    return 1;
  }
  return 0;
}
// Reducer function calls
export function customerSinglePageSelected(resp: {}) {
  return {
    type: CUSTOMER_SINGLE_PAGE,
    resp
  };
}

export function customerPending() {
  return {
    type: CUSTOMER_PENDING
  };
}

export function customerPendingOff() {
  return {
    type: CUSTOMER_PENDING_OFF
  };
}

export function customerAddPageSelected() {
  return {
    type: CUSTOMER_ADD_PAGE
  };
}

// Setup resp:{} for typescript.
export function customerListReceived(resp: {}) {
  return {
    type: CUSTOMER_LIST_RECEIVED,
    resp
  };
}

export function customerError(resp: {}) {
  return {
    type: CUSTOMER_ERROR,
    resp
  };
}

export function customerEditPageSelected(resp: {}) {
  return {
    type: CUSTOMER_EDIT_PAGE,
    resp
  };
}

// Call to electron main with ipcRenderer to get server data for customer list
export function handleDeleteCustomerNote(customerID: { props: number }) {

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState().customer;
    const mainIPCRequest = {
      request: 'deleteCustomerNote',
      customerNoteID: customerID.props,
      customerID: state.singleCustomerInfo.customer.id,
      changeNoteDescription: `Deleted Customer Note: ${customerID.props}`
    };

    // Function needs to be inside the return dispatch scope of handleCustomerAddForm
    const handleDeleteCustomerNoteResp = (
      _event: {},
      resp: { error: {} }
    ) => {
      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          customerSearch: state.singleCustomerInfo.customer.customerName
        };
        dispatch(toggleSuccessModalState('Customer Note Deleted!'));
        dispatch(handleCustomerSearchForm(searchFormObj));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleDeleteCustomerNoteResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleDeleteCustomerNoteResp);
  };
}

export function handleEditCustomerNote(customerNoteRequest: {updateCustomerNote: string}, _: any, props: any) {
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState()
    const mainIPCRequest = {
      request: 'updateCustomerNote',
      customerNoteID: `${props.props.noteID}`,
      customerNoteText: `${customerNoteRequest.updateCustomerNote}`,
      changeNoteDescription: 'Modified customer note.'
    };

    // Function needs to be inside the return dispatch scope of handleCustomerAddForm
    const handleUpdateCustomerNoteResp = (
      _event: {},
      resp: { error: {} }
    ) => {
      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          customerSearch: state.customer.singleCustomerInfo.customer.customerName
        };
        dispatch(reset('customerEditNote'));
        dispatch(toggleSuccessModalState('Customer Note Updated!'));
        dispatch(handleCustomerSearchForm(searchFormObj));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleUpdateCustomerNoteResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleUpdateCustomerNoteResp);
  };
}

export function handleAddCustomerNote(customerNoteRequest: {addCustomerNote: string}) {

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState()
    const mainIPCRequest = {
      request: 'postCustomerNote',
      customerID: `${state.customer.singleCustomerInfo.customer.id}`,
      customerNote: `${customerNoteRequest.addCustomerNote}`,
      changeNoteDescription: 'Added customer note to current customer.'
    };

    // Function needs to be inside the return dispatch scope of handleCustomerAddForm
    const handleAddCustomerNoteResp = (
      _event: {},
      resp: { error: { number: number } }
    ) => {
      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          customerSearch: state.customer.singleCustomerInfo.customer.customerName
        };
        dispatch(reset('customerAddNote'));
        dispatch(toggleSuccessModalState('Customer Update Complete!'));
        dispatch(handleCustomerSearchForm(searchFormObj));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleAddCustomerNoteResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleAddCustomerNoteResp);
  };
}

export function pullRequestCustomerListData() {
  return (dispatch: Dispatch) => {
    const mainRequest = {
      request: 'getCustomerList'
    };
    const handlePullCustomerListData = (_event: {}, resp: { list: [] }) => {
      if (resp.list.length > 0) {
        dispatch(customerListReceived(resp));
      } else {
        dispatch(customerError(resp));
      }
      // eslint-disable-next-line prettier/prettier
      ipcRenderer.removeListener('asynchronous-reply', handlePullCustomerListData);
    };

    ipcRenderer.send('asynchronous-message', mainRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handlePullCustomerListData);
  };
}

// Setup for customer list call
export function requestCustomerList() {

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    const state = getState();
    if (state.customer.customerList.length < 2) {
      dispatch(pullRequestCustomerListData());
    }

    if (state.customer.loadedCustomerListState) {
      return;
    }
  };
}

export function handleCustomerSearchForm(customerName: {}) {


  return (dispatch: Dispatch, getState: GetCustomerState) => {

    if (isObjEmpty(customerName)) {
      return;
    }

    const state = getState();

    if (customerName.customerSearch === 'undefined'){
      dispatch(toggleErrorModalState('Search Was Empty!'));
      return;
    }
    if (state.customer.customerList.length === 1) {
      // eslint-disable-next-line prettier/prettier
      if (state.customer.customerList[0].customerName === customerName.customerSearch){
        return;
      }
    }
    const mainIPCRequest = {
      request: 'getSearchCustomer',
      customerName: `${customerName.customerSearch}`
    };

    const handleCustomerSearchFormResp = (
      _event: {},
      resp: {
        customer: {};
        error: {
          name: string;
        };
      }
    ) => {

      if (!isObjEmpty(resp.customer)) {
        dispatch(customerSinglePageSelected(resp));} else if (resp.error.name === 'RequestError') {
        // If request isn't in the server
      } else if (isObjEmpty(resp.customer)) {
        dispatch(customerPendingOff())
        dispatch(toggleErrorModalState(`Customer "${customerName.customerSearch}" was not found! Check the spelling or add "${customerName.customerSearch}"`));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
      // Remove Listener to prevent adding one every time this mehtode is called
      ipcRenderer.removeListener('asynchronous-reply', handleCustomerSearchFormResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleCustomerSearchFormResp);
  };
}

export function handleCustomerAddForm(customerToAdd: {
  customerGenStatus: string;
  customerRSStatus: string;
  customerActive: string;
  customerName: string;
  customerCodeName: string;
  customerNote: string;
}) {
  return (dispatch: Dispatch) => {
    // Setting yes no values as a boolean number 1 or 0
    const returnGenStatus = returnOneZeroFromString(customerToAdd.customerGenStatus);
    const returnRSStatus = returnOneZeroFromString(customerToAdd.customerRSStatus);
    const returnActiveStatus = returnOneZeroFromString(customerToAdd.customerActive);

    const mainIPCRequest = {
      request: 'postAddCustomer',
      customerName: `${customerToAdd.customerName}`,
      customerCodeName: `${customerToAdd.customerCodeName}`,
      customerGenStatus: returnGenStatus,
      customerRSStatus: returnRSStatus,
      customerActive: returnActiveStatus,
      customerNote: `${customerToAdd.customerNote}`
    };
    // Function needs to be inside the return dispatch scope of handleCustomerAddForm
    const handleAddCustomerResp = (
      _event: {},
      resp: { error: { number: number } }
    ) => {
      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          customerSearch: mainIPCRequest.customerName
        };

        dispatch(reset('customerAddForm'));
        dispatch(handleCustomerSearchForm(searchFormObj));
      } else if (resp.error.number === 2627) {
        // eslint-disable-next-line prettier/prettier
        dispatch(toggleErrorModalState('Error Customer or code already name already used!'));
        dispatch(customerAddPageSelected());
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(customerError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleAddCustomerResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleAddCustomerResp);
  };
}

export function handleEditCustomerForm(customerInfo: string) {
  return (dispatch: Dispatch) => {
    const mainIPCRequest = {
      request: 'getSearchCustomer',
      customerName: `${customerInfo}`
    };
    const handleCustomerSearchFormResp = (_event: {}, resp: {}) => {
      if (!isObjEmpty(resp.customer)) {
        dispatch(reset('customerEditForm'));
        dispatch(customerEditPageSelected(resp));
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
      // Remove Listener to prevent adding one every time this method is called
      ipcRenderer.removeListener(
        'asynchronous-reply',
        handleCustomerSearchFormResp
      );
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(customerPending());
    ipcRenderer.on('asynchronous-reply', handleCustomerSearchFormResp);
  };
}

export function handleEditCustomerSubmit(editCustomer: {
  customerGenStd: string;
  customerRsStd: string;
  customerActive: string;
  customerName: string;
  customerCodeName: string;
}) {
    // Setup to set all values and filter out null values.
  const mainIPCRequest = {
    request: 'updateCustomer',
    customerName: editCustomer.customerName,
    customerCodeName: editCustomer.customerCodeName,
    customerGenStd: returnOneZeroFromString(editCustomer.customerGenStd),
    customerActive: returnOneZeroFromString(editCustomer.customerActive),
    customerRsStd: returnOneZeroFromString(editCustomer.customerRsStd)
  }

  return (dispatch: Dispatch) => {

    if (mainIPCRequest.customerGenStd === null
      && mainIPCRequest.customerActive === null
      && mainIPCRequest.customerRsStd === null
      && mainIPCRequest.customerCodeName == null){

      dispatch(toggleErrorModalState('No Changes Where Made!'));
      dispatch(handleEditCustomerForm(editCustomer.customerName));
    } else {
      const handleUpdateCustomerFormResp = (_event: {}, resp: {}) => {
        if (resp.editCustomer.success === 'Success' && resp.changeNotePost.success === 'Success') {
          const searchFormObj = {
            customerSearch: editCustomer.customerName
          };
          dispatch(toggleSuccessModalState('Customer Update Complete!'));
          dispatch(handleCustomerSearchForm(searchFormObj));
        } else {
          dispatch(customerError(resp));
        }
        ipcRenderer.removeListener('asynchronous-reply',handleUpdateCustomerFormResp);
      }
      ipcRenderer.send('asynchronous-message', mainIPCRequest);
      dispatch(customerPending());
      ipcRenderer.on('asynchronous-reply', handleUpdateCustomerFormResp);
    }
  };
}
