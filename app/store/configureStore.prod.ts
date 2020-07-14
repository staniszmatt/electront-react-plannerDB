import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { Store, customerStateType, modalStateType } from '../reducers/types';
// import { Store, customerStateType, counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState: {
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
      }
    | customerStateType;
  modals?:
    | {
        modalState: boolean;
        errorModalState: boolean;
        successModalState: boolean;
        warningModalState: boolean;
        modalMessage: string;
      }
    | modalStateType;
  // counter?: number | counterStateType;
}): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
