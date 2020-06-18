import * as React from 'react';
import CustomerErrorRow from './customerErrorRow';

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
        <CustomerErrorRow
          key={key + index}
          props={{ keyName: key, error: errors[key] }}
        />
      );
    });
    return customerErrorRow;
  };

  return <div>{renderErroRows()}</div>;
}
