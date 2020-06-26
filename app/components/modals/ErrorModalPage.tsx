import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { toggleOpenModalState, openErrorModal } from '../../actions/errorModal';
import { errorModalStateType } from '../../reducers/types';
import ModalBtn from '../buttonFunctions/buttonClickHandler';
import styles from './modal.css';

interface Props {
  toggleOpenModalState: () => {};
  errorModal: {
    errorOpenState: boolean;
    modalMessage: string;
  };
}

function mapStateToProps(state: errorModalStateType) {
  return {
    errorModal: state
  };
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

function AlartModal(props: Props) {
  console.log("Modal Component", props);

  const { toggleOpenModalState } = props;

  return (
    <div>
      {props.errorModal.errorModal.errorOpenState &&
        <ReactModal
          isOpen={props.errorModal.errorModal.errorOpenState}
          onRequestClose={toggleOpenModalState}
          contentLabel="ERROR: "
          ariaHideApp={false}
          className={styles["error-modal-container"]}
        >
          <h5>{props.errorModal.errorModal.modalMessage}</h5>
          <ModalBtn buttonName="CLOSE" ClickHandler={toggleOpenModalState} />
        </ReactModal>
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlartModal);
