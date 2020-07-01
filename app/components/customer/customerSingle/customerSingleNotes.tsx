import * as React from 'react';
import styles from './customerSingle.css';

interface Props {
  props: {
    changeNoteDateStamp: string;
    changeNoteDescription: string;
    changeNoteID: number;
    typeCategory: string;
    userID: string;
  }

}

export default function CustomerNoteRow(props: Props) {
  const {
    changeNoteDateStamp,
    changeNoteDescription,
    changeNoteID,
    typeCategory,
    userID
  } = props.props;

  return (
    <div className={styles["single-customer-note"]} id={`ChangeNoteID-${changeNoteID}`}>
      <div>
        <div>
          <div>Modified By:</div>
          <div>{userID}</div>
        </div>
        <div>
          <div>Note Type:</div>
          <div>{typeCategory}</div>
        </div>
        <div>
          <div>Modification:</div>
          <div>{changeNoteDescription}</div>
        </div>
        <div>
          <div>Date Modified:</div>
          <div>{changeNoteDateStamp}</div>
        </div>
      </div>
    </div>
  );
}
