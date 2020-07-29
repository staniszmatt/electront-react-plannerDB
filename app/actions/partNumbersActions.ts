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
export const PARTNUM_LOAD_EDIT_PAGE = 'PARTNUM_LOAD_EDIT_PAGE';

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

export function partNumberEditPage(resp: {}) {
  return {
    type: PARTNUM_LOAD_EDIT_PAGE,
    resp
  };
}

export function partNumberListPage(resp: {}) {
  return {
    type: PARTNUM_LOAD_LIST_PAGE,
    resp
  };
}

export function handlePartNumSearchForm(partNumName: { partNumSearch: string }) {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState().partnumbers;

    if (partNumName.partNumSearch === 'undefined' || isObjEmpty(partNumName)) {
      dispatch(toggleErrorModalState('Search Was Empty!'));
      return;
    }
    // TODO: Setup once display list is completed
    // Stop if same search already displayed

    if (!isObjEmpty(state.singlePartNumber)) {
      if (state.singlePartNumber.singlePartNumber.partNumberName === partNumName.partNumSearch) {
        return;
      }
    }

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

export function handleEditPartNumNote(noteRequest: {updateNote: string}, _e: unused, props: { props: { noteID: number } }) {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState().partnumbers.singlePartNumber
    const mainIPCRequest = {
      request: 'updatePartNumberNote',
      noteID: props.props.noteID,
      noteText: `${noteRequest.updateNote}`,
      changeNoteDescription: 'Modified part number note.'
    };

    // Function needs to be inside the return dispatch scope
    const handleUpdatePartNumberNoteResp = (
      _event: unused,
      resp: { error: {} }
    ) => {

      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          partNumSearch: state.singlePartNumber.partNumberName
        };
        dispatch(reset('editNote'));
        dispatch(toggleSuccessModalState('Part Number Note Updated!'));
        dispatch(handlePartNumSearchForm(searchFormObj));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(partNumberError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleUpdatePartNumberNoteResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handleUpdatePartNumberNoteResp);
  }
}

export function handleDeletePartNumNote(partNumberID: { props: string }) {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state =  getState().partnumbers.singlePartNumber;
    const id = parseInt(partNumberID.props, 10);
    const mainIPCRequest = {
      request: 'deletePartNumberNote',
      noteID: id,
      partNumberID: state.singlePartNumber.id,
      changeNoteDescription: `Deleted Part Number Note: ${partNumberID.props}`
    };
    // Function needs to be inside the return dispatch scope
    const handleDeletePartNumberNoteResp = (
      _event: {},
      resp: { error: {} }
    ) => {
      if (isObjEmpty(resp.error)) {
        const searchFormObj = {
          partNumSearch: state.singlePartNumber.partNumberName
        };
        dispatch(toggleSuccessModalState('Part Number Note Deleted!'));
        dispatch(handlePartNumSearchForm(searchFormObj));
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(partNumberError(resp));
      }
      // This prevents adding a listener every time this function is called on ipcRenderOn
      ipcRenderer.removeListener('asynchronous-reply', handleDeletePartNumberNoteResp);
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handleDeletePartNumberNoteResp);
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
        dispatch(toggleErrorModalState('Error part number name already used!'));
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









export function handleEditPartNumberSubmit(editPartNumber) {
  console.log("handle edit customer submit, editPartNumber", editPartNumber)
  return (dispatch: Dispatch) => {

  }
}









export function handleEditPartNumForm(partNumberName: string) {


  return (dispatch: Dispatch) => {
    const mainIPCRequest = {
      request: 'getSearchPartNumber',
      partNumberName
    };









    const handlePartNumberSearchFormResp = (_event: {}, resp: { partNumber: string; error: { customerName:string; name: string; } }) => {
      if (!isObjEmpty(resp.partNumber)) {
        dispatch(reset('partNumberEditForm'));
        dispatch(partNumberEditPage(resp));
      } else if (resp.error.name === 'RequestError') {
        // If request isn't in the server
        dispatch(
          partNumberError({
            list: [],
            error: {
              customerName: `Part number has not been added, please add '${mainIPCRequest.partNumberName}'`
            }
          })
        );
      } else {
        // If errors are not specified above, then pass whole error
        dispatch(partNumberError(resp));
      }
      // Remove Listener to prevent adding one every time this method is called
      ipcRenderer.removeListener(
        'asynchronous-reply',
        handlePartNumberSearchFormResp
      );
    };
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handlePartNumberSearchFormResp);













  }
}

















export function handleDeletePartNumber() {
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    debugger;
  }
}

















export function handleAddPartNumNote(noteRequest: { addNote: string }) {
  console.log('handle add part number note, request:', noteRequest);
  return (dispatch: Dispatch, getState: GetPartNumbersState) => {
    const state = getState();
    const mainIPCRequest = {
      request: 'postPartNumberNote',
      partNumberID: `${state.partnumbers.singlePartNumber.singlePartNumber.id}`,
      partNumberNoteText: `${noteRequest.addNote}`,
      changeNoteDescription: 'Added note to current part number.'
    };

    const handleAddPartNumberNoteResp = (
      _event: {},
      resp: { partNumberNoteData: { error: {} } }
    ) => {
      if (isObjEmpty(resp.partNumberNoteData.error)) {
        const searchFormObj = {
          partNumSearch: state.partnumbers.singlePartNumber.singlePartNumber.partNumberName
        };
        dispatch(reset('addNote'));
        dispatch(handlePartNumSearchForm(searchFormObj));
      } else {
        dispatch(partNumberError(resp.partNumberNoteData.error))
      }
      ipcRenderer.removeListener('asynchronous-reply', handleAddPartNumberNoteResp);
    }
    ipcRenderer.send('asynchronous-message', mainIPCRequest);
    dispatch(partNumLoading());
    ipcRenderer.on('asynchronous-reply', handleAddPartNumberNoteResp);
  }
}
