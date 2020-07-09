/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './formInput.css';
import { notStrictEqual } from 'assert';

interface Props {
  checkedValue: boolean;
  defaultValue: string;
  disabled: boolean;
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
    defaultValue,
    disabled,
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
        defaultValue={defaultValue}
        disabled={disabled}
      />
      <p className="red-text darken-2">{touched && error}</p>
    </div>
  );
}
