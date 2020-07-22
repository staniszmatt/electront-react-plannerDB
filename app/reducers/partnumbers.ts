import { Action } from 'redux';
import {
  PARTNUM_LOADING,
  PARTNUM_LOAD_ADD_PAGE,
  PARTNUM_ERROR_PAGE
} from '../actions/partNumbersActions';

const IState = {
  errorState: false,
  error: {},
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
        errorState: false,
        error: {},
        loadingState: !state.loadingState,
        loadPartAddPage: false
      };
    case PARTNUM_LOAD_ADD_PAGE:
      return {
        ...state,
        errorState: false,
        error: {},
        loadingState: false,
        loadPartAddPage: true
      };
    case PARTNUM_ERROR_PAGE:
      return {
        ...state,
        errorState: true,
        error: action.resp,
        loadingState: false,
        loadPartAddPage: false
      };
    default:
      return state;
  }
}
