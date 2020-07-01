import * as React from 'react';
import styles from './error.css';

export default function CustomerErrorRow(props) {
  const { keyName, error } = props.props;
  // TODO: Think of this should be stored or displayed later
  if (typeof(error) !== 'string'){
    return null;
  }

  return (
    <div className={styles.errorRowContainer}>
      <div className={styles.errorName}>{keyName}:</div>
      <div className={styles.errorData}>{error}</div>
    </div>
  );
}
