import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

// export type counterStateType = {
//   counter: number;
// };

export type errorModalStateType = {
  errorOpenState: boolean;
  modalMessage: string;
};

export type customerStateType = {
  loadingState: boolean;
  errorState: boolean;
  loadedCustomerListState: boolean;
  loadedCustomerAddState: boolean;
  loadCustomerAddPage: boolean;
  loadCustomerSinglePage: boolean;
  customerList: [];
  singleCustomerInfor: {};
  error: [];
};

// export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;
export type GetErrorModalState = () => errorModalStateType;

export type Store =
  | ReduxStore<customerStateType, Action<string>>
  | ReduxStore<errorModalStateType, Action<string>>;
// Original setup for both counter and customer
// | ReduxStore<counterStateType, Action<string>>
// | ReduxStore<customerStateType, Action<string>>;

export type Dispatch = ReduxDispatch<Action<string>>;
