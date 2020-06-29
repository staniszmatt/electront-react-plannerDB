import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { reducer as fromReducer } from 'redux-form';
// import {  } from 'react-modal';
// import counter from './counter';
import customer from './customer';
import errorModal from './errorModal';

// const { customer } = customerCombineForReducer;
// const { errorModal } = errorModalCombineForReducer;

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    form: fromReducer,
    // counter,
    errorModal,
    customer
  });
}
