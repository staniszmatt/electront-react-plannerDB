/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import styles from './error.css';

interface Props {
  props: {
    keyName: {};
    error: string;
  };
}

export default function CustomerErrorRow(props: Props) {
  const { keyName, error } = props.props;
  // TODO: Think of this should be stored or displayed later
  if (typeof error !== 'string') {
    return null;
  }

  return (
    <div className={styles.errorRowContainer}>
      <div className={styles.errorName}>{keyName}:</div>
      <div>{error}</div>
    </div>
  );
}
