import { Action } from 'redux';
import { TOGGLE_MODAL_OPEN_STATE } from '../actions/errorModal';

const IState = { errorOpenState: false };

function errorModal(state = IState, action: Action<string>) {
  switch (action.type) {
    case TOGGLE_MODAL_OPEN_STATE:
      return { ...state, errorOpenState: !state.errorOpenState };
    default:
      return state;
  }
}

const errorModalCombineForReducer = {
  // Can add another state managment here and shows as a seperate object in props
  errorModal
};

export default errorModalCombineForReducer;
