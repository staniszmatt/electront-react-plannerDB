import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as fromReducer } from 'redux-form';
import counter from './counter';
import customer from './customer';
import partnumbers from './partnumbers';
import modals from './modals';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: fromReducer,
    counter,
    modals,
    customer,
    partnumbers
  });
}
