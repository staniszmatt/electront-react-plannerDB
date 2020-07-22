/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styles from './formInput.css';

interface Props {
  defaultValue: string;
  disabled: boolean;
  input: { name: string };
  rows: number;
  label: string;
}

export default function FormTextArea(props: Props) {
  const { defaultValue, disabled, input, rows, label } = props;

  return (
    <div className={styles['textarea-container']}>
      <div>
        <label htmlFor={props.input.name}>{label}</label>
      </div>
      <div>
        <textarea
          {...input}
          defaultValue={defaultValue}
          disabled={disabled}
          id={props.input.name}
          aria-multiline
          rows={rows}
        />
      </div>
    </div>
  );
}
