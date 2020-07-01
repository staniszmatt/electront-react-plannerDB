import React from 'react';
import styles from './formInput.css';

interface Props {
  defaultValue: string;
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
    input,
    label,
    type = 'text',
    meta: { error, touched }
  } = props;

  console.log('form field  props: ', props);

  return (
    <div className={styles['form-container']}>
      <label className={styles['form-label-input']} id="input-label">
        {label}
      </label>
      <input
        className={styles['form-field']}
        {...input}
        defaultValue={defaultValue}
        type={type || 'text'}
      />
      <p className="red-text darken-2">{touched && error} </p>
    </div>
  );
}
