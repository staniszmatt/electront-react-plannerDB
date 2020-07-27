/* eslint-disable no-useless-return */
/* eslint-disable prettier/prettier */
import { ipcRenderer } from 'electron';
import { reset } from 'redux-form';
import { GetPartNumbersState, Dispatch } from '../reducers/types';
import {
  toggleErrorModalState,
  toggleSuccessModalState
} from './modalActions';
import isObjEmpty from '../helpFunctions/isObjEmpty';

export const PARTNUM_LOADING = 'PARTNUM_LOADING';
export const PARTNUM_LOAD_ADD_PAGE = 'PARTNUM_LOAD_ADD_PAGE';
export const PARTNUM_ERROR_PAGE = 'PARTNUM_ERROR_PAGE';
export const PARTNUM_LOAD_SINGLE_PAGE = 'PARTNUM_LOAD_SINGLE_PAGE';
export const PARTNUM_LOAD_LIST_PAGE = 'PARTNUM_LOAD_LIST_PAGE';

// Un-used arguments setup
type unused = unknown;

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

export function partNumberSinglePage(resp: {}) {
  return {
    type: PARTNUM_LOAD_SINGLE_PAGE,
    resp
  };
}

export function partNumberListPage(resp: {}) {
  return {
    type: PARTNUM_LOAD_LIST_PAGE,
    resp
  };
}

export function handleAddPartNumNote(noteRequest: {addNote: string}) {
  console.log('handleAddPartNumber Note', noteRequest)
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    console.log("handle add part number note, getState", getState().partnumbers.singlePartNumber);
    console.log("handle add part number note, props", noteRequest);
  }
}

export function handleEditPartNumNote(noteRequest: {updateNote: string}, _e: unused, props: { props: { noteID: number } }) {
  console.log('handleEditPartNumber Note', noteRequest);
  console.log('handle edit part number props:', props);
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    console.log("handle add part number note, getState", getState());
    console.log("handle add part number note, props", noteRequest);
  }
}

export function handleDeletePartNumNote(noteRequest: {updateNote: string}) {
  console.log('handleDeletePartNumber Note', noteRequest)
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    console.log("handle add part number note, getState", getState().partnumbers.singlePartNumber);
    console.log("handle add part number note, props", noteRequest);
  }
}


export function handlePartNumSearchForm(partNumName: { partNumSearch: string }) {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState().partnumbers;

    if (partNumName.partNumSearch === 'undefined' || isObjEmpty(partNumName)) {
      dispatch(toggleErrorModalState('Search Was Empty!'));
      return;
    }
// debugger;
//     // TODO: Setup once display list is completed
//     // Stop if same search already displayed
//     if (state.partNumberList.length === 1) {
//       if (state.partNumberList[0].partNumberName === partNumName.partNumSearch) {
//         return;
//       }
//     }

    const mainIPCRequest = {
      request: 'getSearchPartNumber',
      partNumberName: `${partNumName.partNumSearch}`
    };
    const handlePartNumberSearchFormResp = (
      _event: {},
      resp: {
        singlePartNumber: {};
        error: {};
      }
    ) => {

      if (!isObjEmpty(resp.singlePartNumber)) {
        dispatch(partNumberSinglePage(resp));
      } else if (isObjEmpty(resp.singlePartNumber)) {
        dispatch(partNumLoading());
        dispatch(toggleErrorModalState(`Part Number "${partNumName.partNumSearch}" was not found! Check the spelling or add "${partNumName.partNumSearch}"`));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(partNumLoading());
        dispatch(toggleErrorModalState(resp.error));
      }
      // Remove Listener to prevent adding one every time this method is called
      ipcRenderer.removeListener('asynchronous-reply', handlePartNumberSearchFormResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handlePartNumberSearchFormResp);
  }
}

export function handlePartNumberAddForm(partNumToAdd: {
  materialType: string;
  partNumber: string;
  partNumberNote: string;
  partSerialNumReq: string;
  partSetForProduction: string;
}) {
  return (dispatch: Dispatch) => {
    const sendPartSerialNumReq = returnOneZeroFromString(partNumToAdd.partSerialNumReq);
    const sendPartSetForProduction = returnOneZeroFromString(partNumToAdd.partSetForProduction);
    const mainIPCRequest = {
      request: 'postNewPartNumber',
      partNumberName: partNumToAdd.partNumber,
      partNumberMaterial: partNumToAdd.materialType,
      partNumberSerialNumberRequired: sendPartSerialNumReq,
      partNumberSetForProduction: sendPartSetForProduction,
      partNumberNoteText: partNumToAdd.partNumberNote
    }

    const handleAddPartNumberResp = (
      _event: {},
      resp: {partNumberAdd: { error: { number: number } } }
    ) => {
      if (isObjEmpty(resp.partNumberAdd.error)) {
        const searchFormObj = {
          partNumSearch: mainIPCRequest.partNumberName
        };
        dispatch(reset('partNumberAddForm'));
        dispatch(handlePartNumSearchForm(searchFormObj));
      } else if (resp.partNumberAdd.error.number === 2627) {
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

export function handleListPartNum() {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState().partnumbers
    // Stop if list already loaded
    if (state.loadPartNumberListPage) {
      return;
    }

    const mainRequest = {
      request: 'getPartNumberList'
    };

    const handlePartNumberListDataResp = (_event: unused, resp: { list: [] }) => {
      if (resp.list.length > 0) {
        dispatch(partNumberListPage(resp));
      } else {
        dispatch(partNumberError(resp));
      }
      ipcRenderer.removeListener('asynchronous-reply', handlePartNumberListDataResp);
    }

    ipcRenderer.send('asynchronous-message', mainRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handlePartNumberListDataResp);
  }
}









export function handleEditPartNumForm(partNumberName: string) {
  console.log('Handle Edit Part Number clicked, partNumberName', partNumberName);
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState().partnumbers;
    console.log("handle edit part number state:", state);
    dispatch(partNumLoading());
  }
}
