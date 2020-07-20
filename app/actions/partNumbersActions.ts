/* eslint-disable prettier/prettier */
import { ipcRenderer } from 'electron';
import { reset } from 'redux-form';
import { GetCustomerState, Dispatch } from '../reducers/types';
import {
  toggleErrorModalState,
  toggleSuccessModalState
} from './modalActions';
import isObjEmpty from '../helpFunctions/isObjEmpty';

export const PARTNUM_LOADING = 'PARTNUM_LOADING';


// Un-used arguments setup
// type unused = unknown;

// Helper Functions
// function returnOneZeroFromString(stringToCheck: string) {
//   if (stringToCheck === null) {
//     return null;
//   }
//   if (stringToCheck === 'yes') {
//     return 1;
//   }
//   return 0;
// }

// Reducer function calls
export function partNumLoading() {
  return {
    type: PARTNUM_LOADING
  };
}

// Setup resp:{} for typescript.
// export function customerListReceived(resp: {}) {
//   return {
//     type: CUSTOMER_LIST_RECEIVED,
//     resp
//   };
// }


export function handlePartNumSearchForm(partNumName: { partNumSearch: string }) {
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle Part Number Search Form, state:', getState())
    console.log('Handle Part Number Search Form, partNumName', partNumName);
  }
}

export function handlePartNumberAddForm(props) {
  console.log('Handle Add Part Number Form, props', props);
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle Add Part Number Form, state', getState())
  }
}

export function handleListPartNum(props) {
  console.log('Handle list Part Number Form, props', props);
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle list Part Number Form, state', getState())
  }
}
