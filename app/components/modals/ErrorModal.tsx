import React from 'react';
import styles from './modal.css';

interface Props {}

export default function AlarmModal(props: Props) {
  return (
    <div className={styles["error-modal-container"]}>
      <div>
        <p>ERROR!</p>
      </div>
      <div>
        <p>{props.props}</p>
      </div>
    </div>
  );
}
