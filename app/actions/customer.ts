import {
  CustomerProps,
  LIST_CUSTOMERS,
  EDIT_CUSTOMER,
  ADD_CUSTOMER,
  SEARCH_CUSTOMER,
  CustomerActionTypes
} from '../store/customer/types';

export function listCustomers(createListCustomers: CustomerProps): CustomerActionTypes {
  return {
    type: LIST_CUSTOMERS,
    payload: createListCustomers
  }
}

export function editCustomer(editACustomer: CustomerProps): CustomerActionTypes {
  return {
    type: EDIT_CUSTOMER,
    payload: editACustomer
  }
}

export function addCustomer(addACustomer: CustomerProps): CustomerActionTypes {
  return {
    type: ADD_CUSTOMER,
    payload: addACustomer
  }
}

export function searchCustoemr(searchACustomer: CustomerProps): CustomerActionTypes {
  return {
    type: SEARCH_CUSTOMER,
    payload: searchACustomer
  }
}
