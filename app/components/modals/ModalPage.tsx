import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { toggleModalState } from '../../actions/modal';
import { errorModalStateType } from '../../reducers/types';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import WarningModal from './warningModal';
import ModalBtn from '../buttonFunctions/buttonClickHandler';
import styles from './modal.css';

interface Props {
  toggleModalState: () => {};
  state: {
    modalState: boolean;
    errorModalState: boolean;
    successModalState: boolean;
    warningModalState: boolean;
    modalMessage: string;
  };
}

function mapStateToProps(state: errorModalStateType) {
  return {
    state
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      toggleModalState
    },
    dispatch
  );
}

function AlarmModal(props: Props) {
  // toggleModalState is needed to be called here to gain proper access to the toggle state.
  // eslint-disable-next-line no-shadow
  const { toggleModalState } = props;

  console.log('modal props: ', props);

  return (
    <div>
      {props.state.modal.modalState && (
        <ReactModal
          isOpen={props.state.modal.modalState}
          onRequestClose={toggleModalState}
          contentLabel="MODAL"
          ariaHideApp={false}
          className={styles["modal-container"]}
        >
          {props.state.modal.errorModalState && <ErrorModal props={props.state.modal.modalMessage} />}
          {props.state.modal.successModalState && <SuccessModal props={props.state.modal.modalMessage} />}
          {props.state.modal.warningModalState && <WarningModal props={props.state.modal.modalMessage} />}

          {!props.state.modal.warningModalState && (
            <div>
              <ModalBtn buttonName="CLOSE" ClickHandler={toggleModalState} />
            </div>
          )}
          {props.state.modal.warningModalState && (
            <div>
              <ModalBtn buttonName="CANCEL" ClickHandler={toggleModalState} />
            </div>
          )}

        </ReactModal>
      )}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlarmModal);
