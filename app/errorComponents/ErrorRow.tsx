import * as React from 'react';

export default function CustomerErrorRow(props) {
  console.log("Row function", props);
  const { keyName, error } = props.props;
  // TODO: Think of this should be stored or displayed later
  if (typeof(error) !== 'string'){
    return null;
  }

  return (
    <div>
      <div>{keyName}</div>
      <div>{error}</div>
    </div>
  );
}
