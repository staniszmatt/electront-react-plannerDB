import { Action } from 'redux';
import { LIST_CUSTOMERS, EDIT_CUSTOMER, ADD_CUSTOMER, SEARCH_CUSTOMER } from '../actions/customer';
console.log("Reducer called");
export default function counter(state = {
  DisplayCustomerList: false,
  DisplayAddCustomer: false,
  CustomerListItems: [],
  error: []
  },
  action: Action<string>
) {
  switch (action.type) {
    case LIST_CUSTOMERS:
      // return { ...state, DisplayCustomerList: !state.DisplayAddCustomer };
      // The above line is the same as:
        // return Ojbect.assign({}, state, {
        // DisplayCustomerList: !state.DisplayCustomerList
        // })
      return state;
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
