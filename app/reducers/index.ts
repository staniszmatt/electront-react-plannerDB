import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as fromReducer } from 'redux-form';
import counter from './counter';
import customerCombineForReducer from './customer';

const { customer } = customerCombineForReducer;

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: fromReducer,
    customer,
    counter
  });
}
