import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import { Store, customerStateType, counterStateType } from '../reducers/types';

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(
  initialState:
    | {
        router?:
          | {
              location: {
                pathname: string;
                search: string;
                state: import('history').History.PoorMansUnknown;
                hash: string;
                key?: string | undefined;
              };
              action: import('history').Action;
            }
          | undefined;
        customer?: {} | customerStateType | undefined;
        counter?: number | counterStateType | undefined;
      }
    | undefined
): Store {
  return createStore(rootReducer, initialState, enhancer);
}

// function configureCustomerStore(initialState?: customerStateType): CustomerStore {
//   return createStore(rootReducer, initialState, enhancer);
// }

export default { configureStore, history };
