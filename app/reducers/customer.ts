import { Action } from 'redux';
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RECIEVED,
  CUSTOMER_LIST_ERROR,
  CUSTOMER_SEARCH_SCREEN
} from '../actions/customer';

const IState = {
  searchCustomerState: false,
  loadingState: false,
  loadedState: false,
  errorState: false,
  customerList: [],
  error: []
};

function customer(state = IState, action: Action<string>) {
  switch (action.type) {
    case CUSTOMER_LIST_REQUEST:
      return {
        ...state,
        searchCustomerState: false,
        loadingState: true,
        loadedState: false,
        errorState: false,
        customerList: [],
        error: {}
      };
    case CUSTOMER_LIST_RECIEVED:
      return {
        ...state,
        searchCustomerState: false,
        loadingState: false,
        loadedState: true,
        errorState: false,
        customerList: action.resp.list,
        error: {}
      };
    case CUSTOMER_LIST_ERROR:
      return {
        ...state,
        searchCustomerState: false,
        loadingState: false,
        loadedState: false,
        errorState: true,
        customerList: [],
        error: action.resp.error
      };
    case CUSTOMER_SEARCH_SCREEN:
      return {
        ...state,
        searchCustomerState: true,
        loadingState: false,
        loadedState: false,
        errorState: false,
        customerList: [],
        error: {}
      };
    default:
      return state;
  }
}

const customerCombineForReducer = {
  // customer,
  customer
};

export default customerCombineForReducer;
