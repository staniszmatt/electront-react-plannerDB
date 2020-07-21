/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormRadioInput from './formRadioInput';
import styles from './formInput.css';

interface Props {
  checkedValue: boolean;
  defaultValue: string;
  disabled: boolean;
  input: { name: string };
  label: string;
  type: string;
  name: string;
  meta: {
    error: {};
    touched: {};
  };
}

export default function FormYesNo(props: Props) {
  const {
    checkedValue,
    defaultValue,
    disabled,
    input,
    name,
    label,
    type = 'text',
    meta: { error, touched }
  } = props;
  return (
    <div className={styles['radio-container']}>
      <div>
        <label htmlFor={name}>{label}</label>
        <div>
          <label>
            Yes
            <Field
              name={props.input.name}
              component={FormRadioInput}
              type="radio"
              value="yes"
            />
          </label>
          <label>
            No
            <Field
              name={props.input.name}
              component={FormRadioInput}
              type="radio"
              value="no"
            />
          </label>
        </div>
      </div>
      <p className="red-text darken-2">{touched && error}</p>
    </div>
  );
}
