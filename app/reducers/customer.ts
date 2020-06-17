import { Action } from 'redux';
import {
  LIST_CUSTOMERS,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_RECIEVED
} from '../actions/customer';

const IState = {
  DisplayCustomerList: false,
  CustomerListItems: {
    status: 'INITIAL',
    customerList: [],
    error: []
  }
}

function customer(state = IState, action: Action<string>) {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return { ...state, DisplayCustomerList: !state.DisplayCustomerList };
    default:
      return state;
  }
}

// function currentListStatus(state = IState.CustomerListItems, action: Action<string> ){
//   switch (action.type) {
//     case CUSTOMER_LIST_REQUEST:
//       return {
//         ...state,
//         RetrivingList: true,
//         RetrivedList: false,
//         ErrorList: false,
//         customerList: action.status
//       }
//     case CUSTOMER_LIST_RECIEVED:
//       return {
//         ...state,
//         RetrivingList: false,
//         RetrivedList: true,
//         ErrorList: false
//       }
//     case CUSTOMER_LIST_ERROR:
//       return {
//         ...state,
//         RetrivingList: false,
//         RetrivedList: false,
//         ErrorList: true
//       }
//     default:
//       return state;
//   }
// }

function customerListRequestStatus(state = IState.CustomerListItems, action: Action<string> ) {
  switch (action.type) {
    case CUSTOMER_LIST_RECIEVED:
      // NOTE: Error on action.resp does excist, just not until after its passed.
      console.log("reducer customer list check action pass", action.resp);

      return {
        ...state,
        status: 'LOADED',
        customerList: action.resp.list,
        error: false
      };
    default:
      return state;
  }
}

const customerCombineForReducer = {
  customer,
  customerListRequestStatus
};

export default customerCombineForReducer;
