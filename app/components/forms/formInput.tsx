import React from 'react';
import styles from './formInput.css';

interface Props {
  defaultValue: string;
  checkedValue: boolean;
  input: string;
  label: string;
  type: string;
  meta: {
    error: {};
    touched: {};
  }
}

export default function FormField(props: Props) {
  const {
    defaultValue,
    checkedValue,
    input,
    label,
    type = 'text',
    meta: { error, touched }
  } = props;

  console.log('form field  props: ', props);
  console.log('FORM  Check Value: ', checkedValue);

  return (
    <div className={styles['form-container']}>
      <label className={styles['form-label-input']} id="input-label">
        {label}
      </label>
      <input
        className={styles['form-field']}
        {...input}
        type={type || 'text'}
        defaultValue={defaultValue}
        checked={checkedValue}
        // onChange={handleChecked}
      />
      <p className="red-text darken-2">{touched && error} </p>
    </div>
  );
}
