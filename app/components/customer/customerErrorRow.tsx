import * as React from 'react';

export default function CustomerErrorRow(props) {
  console.log("Row function", props);
  const { keyName, error } = props.props;

  return (
    <div>
      <div>{keyName}</div>
      <div>{error}</div>
    </div>
  );
}
