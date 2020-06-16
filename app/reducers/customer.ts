import { Action } from 'redux';
import {
  LIST_CUSTOMERS,
  REQUEST_CUSTOMER_LIST,
  RECIEVED_CUSTOMER_LIST,
  ERROR_CUSTOMER_LIST,
  SELECT_CUSTOMER_LIST
  // EDIT_CUSTOMER,
  // ADD_CUSTOMER,
  // SEARCH_CUSTOMER
} from '../actions/customer';

export default function customer(
  state = {
    DisplayCustomerList: false

    // DisplayAddCustomer: false,
    // CustomerID: 0,
    // error: []
  },
  action: Action<string>
) {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return { ...state, DisplayCustomerList: !state.DisplayCustomerList };
    // case EDIT_CUSTOMER:
    //   return state;
    // case ADD_CUSTOMER:
    //   return state;
    // case SEARCH_CUSTOMER:
    //   return state;
    default:
      return state;
  }
}

function selectCustomerList (state = 'reactjs',
  action: Action<string>
) {
  switch (action.type) {
    case SELECT_CUSTOMER_LIST:
      return action.response
    default:
      return state;
  }
}

function posts(
  state = {
    CustomerListItems: {
      customerList: [],
      gettingCustomerList: false,
      haveCustomerList: false,
      error: []
    }
  },
  action: Action<string>
) {
  switch (action.type){
    case REQUEST_CUSTOMER_LIST:
      return {
        ...state.CustomerListItems,
        gettingCustomerList: true,
        haveCustomerList: false
      };
    case RECIEVED_CUSTOMER_LIST:
      return {
        ...state.CustomerListItems,
        gettingCustomerList: false,
        haveCustomerList: true,
        list: action.posts
      };
    case ERROR_CUSTOMER_LIST:
      return {
        ...state.CustomerListItems,
        gettingCustomerList: false,
        haveCustomerList: false,
        list: action.type.error
      };
    default:
      return state.CustomerListItems;
  }
}

function postsByCustomerList(state = {}, action: Action<string>) {
  switch (action.type) {
    case REQUEST_CUSTOMER_LIST:
    case RECIEVED_CUSTOMER_LIST:
    case ERROR_CUSTOMER_LIST:
      return {
        ...state,
        [action.response]: posts(state[action.response], action)
      };
    default:
      return state;
  }
}
