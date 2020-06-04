import * as React from 'react';
import CustomerRow from './customerRow';
import { render } from 'react-dom';

export default function CustomerHeadTable(props){
  //Stop running if nothing was passed
  if (!props || props.props.length === 0) {
    return null;
  }

  const data = props.props

  const renderRows = () => {
    const customerRow = data.map(customer => {
      return <CustomerRow key={customer.id} props={customer} />;
    });
    return customerRow;
  }

  return (
      <table /*className="customerListTbl"*/>
        <caption>Customer List</caption>
        <tbody>
          <tr /*className="customerTableHeader*/>
            <th>Customer Name</th>
            <th>Customer Code</th>
            <th>General Standards Approved</th>
            <th>RS Standards Approved</th>
            <th>Active Customer</th>
            <th>Edit Customer</th>
          </tr>
            {renderRows()}
        </tbody>
      </table>
  )
}
