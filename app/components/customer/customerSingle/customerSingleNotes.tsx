import * as React from 'react';
import styles from './customerSingle.css'

export default function CustomerNoteRow(props) {
  console.log('Note Row single customer props:', props);
  const {
    changeNoteDateStamp,
    changeNoteDescription,
    changeNoteID,
    customerNoteText,
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
          <div>{changeNoteDescription}</div>
        </div>
        <div>
          <div>Date Modified</div>
          <div>{changeNoteDateStamp}</div>
        </div>
      </div>
      <div>
        <div>
          <textarea>{customerNoteText}</textarea>
        </div>
      </div>
    </div>
  );
}
