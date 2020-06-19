import React from 'react';
import styles from './formInput.css';

interface Props {}

export default function FormField(props: Props) {
  const {
    input,
    label,
    type = 'text',
    meta: { error, touched }
  } = props;
  return (
    <div className={styles['form-container']}>
      <label className={styles["form-label-input"]} id="input-label"> {label} </label>
      <input className={styles["form-field"]} {...input} type={type ? type : 'text'} />
    </div>
  );
};
