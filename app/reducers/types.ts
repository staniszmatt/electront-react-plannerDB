import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type counterStateType = {
  counter: number;
};

export type customerList = {
  customerList: [];
  gettingCustomerList: boolean;
  haveCustomerList: boolean;
  error: [];
};

export type customerStateType = {
  DisplayCustomerList: boolean;
  CustomerListItems: customerList;
  // DisplayAddCustomer: boolean;
  // CustomerID: number;
};

export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store =
  | ReduxStore<counterStateType, Action<string>>
  | ReduxStore<customerStateType, Action<string>>;
