import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export type counterStateType = {
  counter: number;
};

export type customerStateType = {
  loadingState: boolean;
  loadedState: boolean;
  errorState: boolean;
  customerList: [];
  error: [];
};

export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;

export type Dispatch = ReduxDispatch<Action<string>>;

export type Store =
  | ReduxStore<counterStateType, Action<string>>
  | ReduxStore<customerStateType, Action<string>>;
