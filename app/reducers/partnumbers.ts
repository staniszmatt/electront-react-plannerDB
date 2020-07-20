import { Action } from 'redux';
import {
  PARTNUM_LOADING,
  PARTNUM_LOAD_ADD_PAGE
} from '../actions/partNumbersActions';

const IState = {
  loadingState: false,
  loadPartAddPage: false
};
export interface PartNumbersAction extends Action {
  type: string;
  resp?: {
    list?: [] | undefined;
    error?: {} | undefined;
  };
}

export default function customer(state = IState, action: PartNumbersAction) {
  switch (action.type) {
    case PARTNUM_LOADING:
      return {
        ...state,
        loadingState: !state.loadingState,
        loadPartAddPage: false
      };
    case PARTNUM_LOAD_ADD_PAGE:
      return {
        ...state,
        loadingState: false,
        loadPartAddPage: true
      };
    default:
      return state;
  }
}
