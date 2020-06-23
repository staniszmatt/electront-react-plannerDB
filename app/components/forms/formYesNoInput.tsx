import React from 'react';
import styles from './formInput.css';

interface Props {}

export default function FormYesNoField(props: Props) {
  const {
    input,
    label,
    type,
    meta: { error, touched }
  } = props;
  return (
    <div className={styles['form-radio-container']}>
      {label}
      <div>
        <label id="input-label-yes">YES</label>
        <input {...input} type={type || 'radio'} />
      </div>
      <div>
        <label id="input-label-no">NO</label>
        <input {...input} type={type || 'radio'} />
      </div>
    </div>
  );
}
