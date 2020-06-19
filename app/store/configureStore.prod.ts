import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { Store, customerStateType } from '../reducers/types';
// import { Store, customerStateType, counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(
  initialState:
    | {
        customer?:
          | {
              loadingState: boolean;
              errorState: boolean;
              loadedCustomerListState: boolean;
              loadedCustomerAddState: boolean;
              customerList: [];
              error: [];
            }
          | customerStateType;
        // counter?: number | counterStateType;
      }
    | undefined
): Store {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
