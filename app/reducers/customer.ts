import { Action } from 'redux';

import {
  CUSTOMER_PENDING,
  CUSTOMER_ERROR,
  CUSTOMER_LIST_RECIEVED,
  CUSTOMER_ADD_PAGE
} from '../actions/customer';

const IState = {
  loadingState: false,
  errorState: false,
  loadedCustomerListState: false,
  loadedCustomerAddState: false,
  loadCustomerAddPage: false,
  customerList: [],
  error: []
};

export default function customer(state = IState, action: Action<string>) {
  switch (action.type) {
    case CUSTOMER_PENDING:
      return {
        ...state,
        loadingState: true,
        errorState: false,
        loadedCustomerListState: false,
        loadedCustomerAddState: false,
        loadCustomerAddPage: false,
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
        loadCustomerAddPage: false,
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
        loadCustomerAddPage: false,
        customerList: [],
        error: action.resp.error
      };
    case CUSTOMER_ADD_PAGE:
      return {
        ...state,
        loadingState: false,
        errorState: false,
        loadedCustomerListState: false,
        loadedCustomerAddState: false,
        loadCustomerAddPage: true,
        customerList: [],
        error: {}
      };
    default:
      return state;
  }
}

// const customerCombineForReducer = {
//   // Can add another state managment here and shows as a seperate object in props
//   customer
// };

// export default customerCombineForReducer;
