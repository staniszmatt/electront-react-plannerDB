import { Action } from 'redux';
import {
  LIST_CUSTOMERS,
  EDIT_CUSTOMER,
  ADD_CUSTOMER,
  SEARCH_CUSTOMER
} from '../actions/customer';

export default function customer(
  state = {
    DisplayCustomerList: false,
    DisplayAddCustomer: false,
    CustomerListItems: [],
    CustomerID: 0,
    error: []
  },
  action: Action<string>
) {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return { ...state, DisplayCustomerList: !state.DisplayCustomerList };
    case EDIT_CUSTOMER:
      return state;
    case ADD_CUSTOMER:
      return state;
    case SEARCH_CUSTOMER:
      return state;
    default:
      return state;
  }
}
