/* eslint-disable no-prototype-builtins */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ErrorRow from './ErrorRow';
import styles from './error.css';

interface Props {
  props: { error?: {} } | any;
}

export default function CustomerErrorDisplay(props: Props) {
  // Stop running if nothing was passed
  if (props.props === undefined) {
    return null;
  }

  const renderErrorRows = () => {
    let errors: any = {};
    // Checking where the error message is
    if (props.props.hasOwnProperty('error')) {
      errors = props.props.error;
    } else {
      errors = props.props;
    }
    // const errors: {} = props.props;
    const customerErrorRow = Object.keys(errors).map((key: string) => {
      return (
        <div className={styles.errorContainer} key="error">
          <ErrorRow key={key} props={{ keyName: key, error: errors[key] }} />
        </div>
      );
    });
    return customerErrorRow;
  };

  return <div>{renderErrorRows()}</div>;
}
