import React from 'react';
import { ipcRenderer } from 'electron';
import CustomerRow from './customerRow';
import { render } from 'react-dom';

export default function CustomerHeadTable(props){
  //Stop running if nothing was passed
  if (!props || props.props.length === 0) {
    return null;
  }

  const getCustomerList = () => {
    console.log("Get Customers");

    const requestData = {testRequestString: "Request Customers!"};
    ipcRenderer.send('asynchronous-message', requestData);

    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      // console.log("getCustomer: Pull Data", resp);
      console.log("customer data ", resp);
      return resp;
    });
  }

  const data = getCustomerList();

  console.log('header component props', props);

  const renderRows = () => {
    console.log("render row data ", data);
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
        {/** {renderRows()} */}
      </tbody>
    </table>
  );
}
