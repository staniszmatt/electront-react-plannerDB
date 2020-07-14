import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

// export type counterStateType = {
//   counter: number;
// };

export type modalStateType = {
  modalState: boolean;
  errorModalState: boolean;
  successModalState: boolean;
  warningModalState: boolean;
  modalMessage: string;
};

export type singleCustomer = {
  changeNoteList: {
    list: [];
  };
  customerActive: boolean;
  customerGenStd: boolean;
  customerRsStd: boolean;
  customerCodeName: string;
  customerName: string;
  id: number;
  success: string;
  customerNotes: {
    error: string;
    noteList: {};
    success: string;
  };
  error: {};
};

export type customerStateType = {
  customer: {
    loadingState: boolean;
    errorState: boolean;
    loadedCustomerListState: boolean;
    loadedCustomerAddState: boolean;
    loadCustomerAddPage: boolean;
    loadCustomerSinglePage: boolean;
    loadCustomerEditPage: boolean;
    customerList: [{ customerName: string }];
    singleCustomerInfo: {
      customer: singleCustomer;
    };
    singleCustomerNoteID: number;
    error: [];
  };
};

// export type GetState = () => counterStateType;
export type GetCustomerState = () => customerStateType;
export type GetErrorModalState = () => modalStateType;

export type Store =
  | ReduxStore<customerStateType, Action<string>>
  | ReduxStore<modalStateType, Action<string>>;
// | ReduxStore<counterStateType, Action<string>>

export type Dispatch = ReduxDispatch<Action<string>>;
