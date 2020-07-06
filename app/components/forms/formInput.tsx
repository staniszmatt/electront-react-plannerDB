/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './formInput.css';

interface Props {
  checkedValue: boolean;
  input: string;
  label: string;
  type: string;
  meta: {
    error: {};
    touched: {};
  };
}

export default function FormField(props: Props) {
  const {
    checkedValue,
    input,
    label,
    type = 'text',
    meta: { error, touched }
  } = props;

  return (
    <div className={styles['form-container']}>
      <label className={styles['form-label-input']} id="input-label">
        {label}
      </label>
      <input
        className={styles['form-field']}
        {...input}
        type={type || 'text'}
        checked={checkedValue}
      />
      <p className="red-text darken-2">{touched && error}</p>
    </div>
  );
}
