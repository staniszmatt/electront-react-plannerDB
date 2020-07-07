import { Action } from 'redux';
import {
  TOGGLE_MODAL_STATE,
  TOGGLE_ERROR_MODAL_STATE,
  TOGGLE_SUCCESS_MODAL_STATE
} from '../actions/modal';

const IState = {
  modalState: false,
  errorModalState: false,
  successModalState: false,
  modalMessage: 'Initial'
};

export default function errorModal(state = IState, action: Action<string>) {
  switch (action.type) {
    case TOGGLE_MODAL_STATE:
      return {
        ...state,
        modalState: false,
        errorModalState: false,
        successModalState: false,
        modalMessage: {}
      };
    case TOGGLE_ERROR_MODAL_STATE:
      return {
        ...state,
        modalState: true,
        errorModalState: true,
        modalMessage: action.resp
      };
    case TOGGLE_SUCCESS_MODAL_STATE:
      return {
        ...state,
        modalState: true,
        successModalState: true,
        modalMessage: action.resp
      };
    default:
      return state;
  }
}

// const errorModalCombineForReducer = {
//   // Can add another state managment here and shows as a seperate object in props
//   errorModal
// };

// export default errorModalCombineForReducer;
