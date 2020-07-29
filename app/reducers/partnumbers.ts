import { Action } from 'redux';
import {
  PARTNUM_LOADING,
  PARTNUM_LOAD_ADD_PAGE,
  PARTNUM_ERROR_PAGE,
  PARTNUM_LOAD_SINGLE_PAGE,
  PARTNUM_LOAD_LIST_PAGE,
  PARTNUM_LOAD_EDIT_PAGE
} from '../actions/partNumbersActions';

const IState = {
  errorState: false,
  error: {},
  loadingState: false,
  loadPartAddPage: false,
  loadSinglePartNumberPage: false,
  loadPartNumberListPage: false,
  loadPartNumberEditPage: false,
  partNumberList: {},
  singlePartNumber: {}
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
        loadPartAddPage: false,
        loadSinglePartNumberPage: false,
        loadPartNumberListPage: false,
        loadPartNumberEditPage: false,
        partNumberList: {},
        singlePartNumber: {}
      };
    case PARTNUM_LOAD_ADD_PAGE:
      return {
        ...state,
        errorState: false,
        error: {},
        loadingState: false,
        loadPartAddPage: true,
        loadSinglePartNumberPage: false,
        loadPartNumberListPage: false,
        loadPartNumberEditPage: false,
        partNumberList: {},
        singlePartNumber: {}
      };
    case PARTNUM_ERROR_PAGE:
      return {
        ...state,
        errorState: true,
        error: action.resp,
        loadingState: false,
        loadPartAddPage: false,
        loadSinglePartNumberPage: false,
        loadPartNumberListPage: false,
        loadPartNumberEditPage: false,
        partNumberList: {},
        singlePartNumber: {}
      };
    case PARTNUM_LOAD_SINGLE_PAGE:
      return {
        ...state,
        errorState: false,
        error: {},
        loadingState: false,
        loadPartAddPage: false,
        loadSinglePartNumberPage: true,
        loadPartNumberListPage: false,
        loadPartNumberEditPage: false,
        partNumberList: {},
        singlePartNumber: action.resp
      };
    case PARTNUM_LOAD_LIST_PAGE:
      return {
        ...state,
        errorState: false,
        error: {},
        loadingState: false,
        loadPartAddPage: false,
        loadSinglePartNumberPage: false,
        loadPartNumberListPage: true,
        loadPartNumberEditPage: false,
        partNumberList: action.resp,
        singlePartNumber: {}
      };
    case PARTNUM_LOAD_EDIT_PAGE:
      return {
        ...state,
        errorState: false,
        error: {},
        loadingState: false,
        loadPartAddPage: false,
        loadSinglePartNumberPage: false,
        loadPartNumberListPage: false,
        loadPartNumberEditPage: true,
        partNumberList: {},
        singlePartNumber: action.resp
      };
    default:
      return state;
  }
}
