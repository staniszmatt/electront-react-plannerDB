import { Action } from 'redux';
import {
  CUSTOMER_PENDING,
  CUSTOMER_ERROR,
  CUSTOMER_LIST_RECIEVED,
  CUSTOMER_ADD_RECIVED
} from '../actions/customer';

const IState = {
  loadingState: false,
  errorState: false,
  loadedCustomerListState: false,
  loadedCustomerAddState: false,
  customerList: [],
  error: []
};

function customer(state = IState, action: Action<string>) {
  switch (action.type) {
    case CUSTOMER_PENDING:
      return {
        ...state,
        loadingState: true,
        errorState: false,
        loadedCustomerListState: false,
        loadedCustomerAddState: false,
        customerList: [],
        error: {}
      };
    case CUSTOMER_LIST_RECIEVED:
      return {
        ...state,
        loadingState: false,
        errorState: false,
        loadedCustomerListState: true,
        loadedCustomerAddState: false,
        customerList: action.resp.list,
        error: {}
      };
    case CUSTOMER_ERROR:
      return {
        ...state,
        loadingState: false,
        errorState: true,
        loadedCustomerListState: false,
        loadedCustomerAddState: false,
        customerList: [],
        error: action.resp.error
      };
    // case CUSTOMER_LIST_RECIEVED:

    default:
      return state;
  }
}

const customerCombineForReducer = {
  // Can add another state managment here and shows as a seperate object in props
  customer
};

export default customerCombineForReducer;
