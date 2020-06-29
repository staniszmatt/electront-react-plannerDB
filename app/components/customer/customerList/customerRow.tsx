import * as React from 'react';
import EditButton from '../../buttonFunctions/buttonClickHandler';

export default function CustomerRow(props) {
  const { id, customerName, customerCodeName, customerGenStd, customerRsStd, customerActive } = props.props
  // Setup boolean to string to add to row data
  const genStd = booleanToStringYesNo(customerGenStd);
  const rsStd = booleanToStringYesNo(customerRsStd);
  const acitve = booleanToStringYesNo(customerActive);

  const returnCustomerID = () => {
    return id;
  };
  // TODO: Fix setup of button on edit customer
  // customerSingleEdit goes here!! *****************
  //* *******************************************
  return (
    <tr>
      <td>{customerName}</td>
      <td>{customerCodeName}</td>
      <td>{genStd}</td>
      <td>{rsStd}</td>
      <td>{acitve}</td>
      <td>
        <EditButton buttonName="EDIT" ClickHandler={returnCustomerID} />
      </td>
    </tr>
  )
}
// Funciton to setup returns of yes or no based on boolean data recieved
function booleanToStringYesNo(varToCheck){
  if (varToCheck) {
    return 'YES';
  }
  return 'NO';
}
