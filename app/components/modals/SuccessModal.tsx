import React from 'react';
import styles from './modal.css';

interface Props {}

export default function SuccessModal(props: Props) {
  console.log("SUCCESS Modal Component", props);
  return (
    <div className={styles["success-modal-container"]}>
      <div>
        <p>SUCCESS!</p>
      </div>
      <div>
        <p>{props.props}</p>
      </div>
    </div>
  );
}
