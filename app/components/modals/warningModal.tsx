/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from './modal.css';
import ModalBtn from '../buttonFunctions/buttonClickHandler';

interface Props {
  props: {
    warningMsg: string;
    handleDeleteCustomerNote: () => {};
    closeModal: () => {};
  };
}

export default function WarningModal(props: Props) {
  const { handleDeleteCustomerNote } = props.props;
  const { closeModal } = props.props;

  const handDeleteBtn = () => {
    handleDeleteCustomerNote();
    closeModal();
  };

  return (
    <div className={styles['warning-modal-container']}>
      <div className={styles.blink_me}>
        <p>WARNING!</p>
      </div>
      <div>
        <p>{props.props.warningMsg}</p>
      </div>
      <div>
        <ModalBtn buttonName="Delete" ClickHandler={handDeleteBtn} />
      </div>
    </div>
  );
}
