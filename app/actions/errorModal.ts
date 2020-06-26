// import { GetErrorModalState, Dispatch } from '../reducers/types';

export const TOGGLE_MODAL_OPEN_STATE = 'TOGGLE_MODAL_OPEN_STATE';
// Reducer function calls
export function toggleOpenModalState(resp: string) {
  return {
    type: TOGGLE_MODAL_OPEN_STATE,
    resp
  };
}
