import * as React from 'react';
import ErrorRow from './ErrorRow';
import styles from './error.css';

export default function CustomerErrorDisplay(props) {
  console.log('Error Display Props', props);
  // Stop running if nothing was passed
  if (props.props === undefined) {
    return null;
  }
  const renderErroRows = () => {
    const errors = props.props;
    const customerErrorRow = Object.keys(errors).map((key, index) => {
      console.log(`errors: ${errors} key: ${key}`);
      return (
        <div className={styles.errorContainer} key="error">
          <ErrorRow key={key} props={{ keyName: key, error: errors[key] }} />
        </div>
      );
    });
    return customerErrorRow;
  };

  return <div>{renderErroRows()}</div>;
}
