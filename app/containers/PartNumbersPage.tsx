import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PartNumbers from '../components/partNumbers/PartNumbers';
import {
  partNumLoading,
  handlePartNumSearchForm,
  handlePartNumberAddForm,
  handleListPartNum
} from '../actions/partNumbersActions';
import { partNumbersStateType } from '../reducers/types';

function mapStateToProps(state: partNumbersStateType) {
  return {
    partNumbers: state.partNumbers
  };
}

function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      partNumLoading,
      handlePartNumSearchForm,
      handlePartNumberAddForm,
      handleListPartNum
    },
    dispatch
  );
}
// TODO: Fix typescript, either the rules or the interface.
export default connect(mapStateToProps, mapDispatchToProps)(PartNumbers);
