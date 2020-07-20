import { Action } from 'redux';
import { PARTNUM_LOADING } from '../actions/partNumbersActions';

const IState = {
  loadingState: false
};
export interface PartNumbersAction extends Action {
  type: string;
  resp?: {
    list?: [] | undefined;
    error?: {} | undefined;
  };
}

export default function customer(state = IState, action: PartNumbersAction) {
  switch (action.type) {
    case PARTNUM_LOADING:
      return {
        ...state,
        loadingState: !state.loadingState
      };
    default:
      return state;
  }
}
