import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type counterStateType = {
  counter: number;
};

export type customerList = {
  status: string;
  customerList: [];
  error: [];
};

export type customerStateType = {
  DisplayCustomerList: boolean;
  CustomerListItems: customerList;
};

export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store =
  | ReduxStore<counterStateType, Action<string>>
  | ReduxStore<customerStateType, Action<string>>;
