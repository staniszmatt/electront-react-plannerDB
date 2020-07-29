import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PartNumbers from '../components/partNumbers/PartNumbers';
import {
  partNumLoadAddPage,
  handlePartNumSearchForm,
  handlePartNumberAddForm,
  handleEditPartNumberSubmit,
  handleListPartNum
} from '../actions/partNumbersActions';
import { partNumbersStateType } from '../reducers/types';

function mapStateToProps(state: partNumbersStateType) {
  return {
    partNumbers: state.partnumbers
  };
}

function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      partNumLoadAddPage,
      handlePartNumSearchForm,
      handlePartNumberAddForm,
      handleEditPartNumberSubmit,
      handleListPartNum
    },
    dispatch
  );
}
// TODO: Fix typescript, either the rules or the interface.
export default connect(mapStateToProps, mapDispatchToProps)(PartNumbers);
