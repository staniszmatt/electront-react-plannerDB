import React from 'react';
import CustomerRow from './customerRow';
import styles from './customerlist.css'

export default function CustomerHeadTable(props){
  // Stop running if nothing was passed
  console.log('list customer props: ', props);
  if (props.props === undefined || props.props.length === 0) {
    return null;
  }

  const renderRows = () => {
    const data = props.props;
    const customerRow = data.map(customer => {
      return <CustomerRow key={customer.id} props={customer} />;
    });
    return customerRow;
  };

  return (
    <table className={styles["main-table"]}>
      <caption>Customer List</caption>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Customer Code</th>
          <th>General Standards Approved</th>
          <th>RS Standards Approved</th>
          <th>Active Customer</th>
          <th>Edit Customer</th>
        </tr>
      </thead>
      <tbody className={styles['t-body']}>{renderRows()}</tbody>
    </table>
  );
}
