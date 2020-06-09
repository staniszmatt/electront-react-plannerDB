import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type counterStateType = {
  counter: number;
};

export type customerStateType = {
  DisplayCustomerList: boolean;
  DisplayAddCustomer: boolean;
  CustomerListItems: [];
  CustomerID: number;
  error: [];
};

export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store =
  | ReduxStore<counterStateType, Action<string>>
  | ReduxStore<customerStateType, Action<string>>;
// export type CustomerStore = ReduxStore<customerStateType, Action<string>>;
