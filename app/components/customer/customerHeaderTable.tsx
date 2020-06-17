import React from 'react';
import CustomerRow from './customerRow';

export default function CustomerHeadTable(props){
  console.log("cust header component props", props);

  //Stop running if nothing was passed
  if (!props || props.props.customerList.length === 0) {
    return null;
  }

  // TODO: Setup error handing here if error was passed
  console.log('header component props', props);


  const renderRows = () => {
    const data = props.props.customerList;
    const customerRow = data.map(customer => {
      return <CustomerRow key={customer.id} props={customer} />;
    });
    return customerRow;
  };

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
        {props.props.status === 'LOADED' && renderRows()}
      </tbody>
    </table>
  );
}
