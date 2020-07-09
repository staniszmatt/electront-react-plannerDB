import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

// export type counterStateType = {
//   counter: number;
// };

export type errorModalStateType = {
  modalState: boolean;
  errorModalState: boolean;
  successModalState: boolean;
  warningModalState: boolean;
  modalMessage: string;
};

export type customerStateType = {
  loadingState: boolean;
  errorState: boolean;
  loadedCustomerListState: boolean;
  loadedCustomerAddState: boolean;
  loadCustomerAddPage: boolean;
  loadCustomerSinglePage: boolean;
  loadCustomerEditPage: boolean;
  customerList: [];
  singleCustomerInfo: {};
  singleCustomerNoteID: number;
  error: [];
};

// export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;
export type GetErrorModalState = () => errorModalStateType;

export type Store =
  | ReduxStore<customerStateType, Action<string>>
  | ReduxStore<errorModalStateType, Action<string>>;
// | ReduxStore<counterStateType, Action<string>>

export type Dispatch = ReduxDispatch<Action<string>>;
