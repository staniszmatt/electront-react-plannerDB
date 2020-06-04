import {
  CustomerState,
  CustomerProps,
  LIST_CUSTOMERS,
  EDIT_CUSTOMER,
  ADD_CUSTOMER,
  SEARCH_CUSTOMER,
  CustomerActionTypes
} from '../store/customer/types';
import { routerActions } from 'connected-react-router';

const initialState: CustomerState = {
  customer: []
}

export function customerReducer (
  state = initialState,
  action: CustomerActionType
): CustomerState {
  switch (action.type) {
    case LIST_CUSTOMERS:
      return {
        customer: [...state.customer, action.payload]
      }
    case EDIT_CUSTOMER:
      return {
        customer: [...state.customer, action.payload]
      }
    case ADD_CUSTOMER:
      return {
        customer: [...state.customer, action.payload]
      }
    case SEARCH_CUSTOMER:
      return {
        customer: [...state.customer, action.payload]
      }
    default:
      return state
  }
}
