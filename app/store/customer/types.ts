export const LIST_CUSTOMERS = 'LIST_CUSTOMERS';
export const EDIT_CUSTOMER = 'EDIT_CUSTOMER';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const SEARCH_CUSTOMER = 'SEARCH_CUSTOMER';

export interface CustomerProps {
  DisplayCustomerList: boolean;
  DisplayAddCustomer: boolean;
  CustomerListItems:[];
  CustomerID: number;
  error: [];
}

export interface CustomerState {
  customer: CustomerProps[];
}

interface ListCustomerAction {
  type: typeof LIST_CUSTOMERS;
  payload: CustomerProps;
}

interface EditCustomerAction {
  type: typeof EDIT_CUSTOMER;
  payload: CustomerProps;
}

interface AddCustomerAction {
  type: typeof ADD_CUSTOMER;
  payload: CustomerProps;
}

interface SearchCustomerAction {
  type: typeof SEARCH_CUSTOMER;
  payload: CustomerProps;
}

export type CustomerActionTypes =
  | ListCustomerAction
  | EditCustomerAction
  | AddCustomerAction
  | SearchCustomerAction;
