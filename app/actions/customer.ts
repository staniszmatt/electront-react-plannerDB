import { GetCustomerState, Dispatch} from '../reducers/types';

export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const SEARCH_CUSTOMER = 'SEARCH_CUSTOMER';

export function listAllCustomers() {
  return {
    type: LIST_CUSTOMERS
  };
}

export function editCustomer() {
  return {
    type: EDIT_CUSTOMER
  };
}

export function addACustomer() {
  return {
    type: ADD_CUSTOMER
  };
}

export function searchACustomer() {
  return {
    type: SEARCH_CUSTOMER
  };
}
