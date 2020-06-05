import { bindActionCreators, Dispatch } from 'redux';
import { connect, ReactReduxContext } from 'react-redux';
import Counter from '../components/Counter';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
} from '../actions/counter';
import { counterStateType } from '../reducers/types';

function mapStateToProps(state: counterStateType) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      increment,
      decrement,
      incrementIfOdd,
      incrementAsync
    },
    dispatch
  );
}

// function  MyConnectedComponent() {
//   return (
//     {({})}
//   )
// }

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
