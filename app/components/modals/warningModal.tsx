import React from 'react';
import styles from './modal.css';
import ModalBtn from '../buttonFunctions/buttonClickHandler';

interface Props {}

export default function WarningModal(props: Props) {
  console.log("WARNING Modal Component", props);
  const deleteNote = props.props.handleDeleteCustomerNote;
  const closeModal = props.props.closeModal

  const handDeleteBtn = () => {
    deleteNote();
    closeModal();
  }

  return (
    <div className={styles["warning-modal-container"]}>
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
