/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import CustomerRow from './customerRow';
import styles from './customerList.css';

interface Props {
  props: {
    [index: number]: {
      customer: {};
    };
    length: number;
  };
}

interface Customer {
  id: number;
  customerName: string;
  customerCodeName: string;
  customerGenStd: boolean;
  customerRsStd: boolean;
  customerActive: boolean;
}

export default function CustomerHeadTable(props: Props) {
  // Stop running if nothing was passed
  if (props.props === undefined || props.props.length === 0) {
    return null;
  }

  const renderRows = () => {
    const data: any = props.props;
    const customerRow = data.map((customer: Customer) => {
      return <CustomerRow key={customer.id} props={customer} />;
    });
    return customerRow;
  };

  return (
    <table className={styles['main-table']}>
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
