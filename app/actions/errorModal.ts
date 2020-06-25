import { GetErrorModalState, Dispatch } from '../reducers/types';

export const TOGGLE_MODAL_OPEN_STATE = 'CUSTOMER_LIST_REQUEST';
// Reducer function calls
export function toggleOpenModalState() {
  return {
    type: TOGGLE_MODAL_OPEN_STATE
  };
}

// Setup for customer list call
export function openErrorModal() {
  return (dispatch: Dispatch, getState: GetErrorModalState) => {
    const state = getState();
    console.log('action toggle errorModal state', state);
    dispatch(toggleOpenModalState);
  };
}
