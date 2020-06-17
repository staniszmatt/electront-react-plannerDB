import * as React from 'react';
import EditButton from '../buttonFunctions/buttonClickHandler';

export default function CustomerRow(props) {
  console.log("Row function", props);
  const { id, customerName, customerCodeName, customerGenStd, customerRsStd, customerActive } = props.props

  const returnCustomerID = () => {
    console.log("Return Customer ID: ", id);
    return id;
  }
// TODO: Fix setup of button on edit customer
  return (
    <tr>
      <td>Test Row</td>
      <td>Test Row</td>
      <td>Test Row</td>
      <td>Test Row</td>
      <td>Test Row</td>
      <td>
        <EditButton
          buttonName="EDIT"
          ClickHandler={returnCustomerID()}
        />
      </td>
    </tr>
  )
}
