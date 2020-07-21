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
export const PARTNUM_LOAD_ADD_PAGE = 'PARTNUM_LOAD_ADD_PAGE';
export const PARTNUM_ERROR_PAGE = 'PARTNUM_ERROR_PAGE';

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
export function partNumLoading() {
  return {
    type: PARTNUM_LOADING
  };
}

export function partNumLoadAddPage() {
  return {
    type: PARTNUM_LOAD_ADD_PAGE
  };
}

// Setup resp:{} for typescript.
export function partNumberError(resp: {}) {
  return {
    type: PARTNUM_ERROR_PAGE,
    resp
  };
}


export function handlePartNumSearchForm(partNumName: { partNumSearch: string }) {
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle Part Number Search Form, state:', getState())
    console.log('Handle Part Number Search Form, partNumName', partNumName);
  }
}

export function handlePartNumberAddForm(partNumToAdd: {
  materialType: string;
  partNumber: string;
  partNumberNote: string;
  partSerialNumReq: string;
  partSetForProduction: string;
}) {
  console.log('Handle Add Part Number Form, props', partNumToAdd);

  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle Add Part Number Form, state', getState());

    const sendPartSerialNumReq = returnOneZeroFromString(partNumToAdd.partSerialNumReq);
    const sendPartSetForProduction = returnOneZeroFromString(partNumToAdd.partSetForProduction)

    const mainIPCRequest = {
      request: 'postNewPartNumber',
      partNumberName: partNumToAdd.partNumber,
      partNumberMaterial: partNumToAdd.materialType,
      partNumberSerialNumberRequired: sendPartSerialNumReq,
      partNumberSetForProduction: sendPartSetForProduction
    }

    console.log('add part number action, ipc request:', mainIPCRequest);




    const handleAddPartNumberResp = (
      _event: {},
      resp: { error: { number: number } }
    ) => {
      debugger;
      if (isObjEmpty(resp.error)) {
        // const searchFormObj = {
        //   customerSearch: mainIPCRequest.partNumberName
        // };

        dispatch(reset('partNumberAddForm'));
        // dispatch(handleCustomerSearchForm(searchFormObj));
        // eslint-disable-next-line no-prototype-builtins
        if(!resp.hasOwnProperty('customerNote')) {
          dispatch(toggleErrorModalState('RELOAD APP! Failed to add part number note! Possibly character issue.'));
        }
      } else if (resp.error.number === 2627) {
        // eslint-disable-next-line prettier/prettier
        dispatch(toggleErrorModalState('Error Customer or code already name already used!'));
        dispatch(partNumLoadAddPage());
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(partNumberError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleAddPartNumberResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handleAddPartNumberResp);




  }
}

export function handleListPartNum(props) {
  console.log('Handle list Part Number Form, props', props);
  return (dispatch: Dispatch, getState: GetCustomerState) => {
    console.log('Handle list Part Number Form, state', getState())
  }
}
