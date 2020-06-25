import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ErrorModal from '../components/ErrorModal';
import { toggleOpenModalState, openErrorModal } from '../actions/errorModal';
import { errorModalStateType } from '../reducers/types';

function mapStateToProps(state: errorModalStateType) {
  return {
    errorModal: state
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      toggleOpenModalState,
      openErrorModal
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
