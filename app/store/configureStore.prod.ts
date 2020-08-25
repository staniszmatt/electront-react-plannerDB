/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import {
  Store,
  customerStateType,
  modalStateType,
  counterStateType,
  partNumbersStateType
} from '../reducers/types';
// import { Store, customerStateType, counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: {
  partNumbers?:
    | {
        errorState: boolean;
        error: {};
        loadingState: boolean;
        loadPartAddPage: boolean;
        loadSinglePartNumberPage: boolean;
        loadPartNumberListPage: boolean;
        loadPartNumberEditPage: boolean;
        partNumberList: {};
        singlePartNumber: {};
      }
    | any
    | partNumbersStateType;
  customer?:
    | {
        loadingState: boolean;
        errorState: boolean;
        loadedCustomerListState: boolean;
        loadedCustomerAddState: boolean;
        loadCustomerAddPage: boolean;
        loadCustomerSinglePage: boolean;
        loadCustomerEditPage: boolean;
        customerList: [];
        singleCustomerInfo: {};
        error: [];
        // eslint-disable-next-line prettier/prettier
      } | any
    | customerStateType;
  modals?:
    | {
        modalState: boolean;
        errorModalState: boolean;
        successModalState: boolean;
        warningModalState: boolean;
        modalMessage: string;
        // eslint-disable-next-line prettier/prettier
      } | any
    | modalStateType;
  counter?: number | counterStateType;
}): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
