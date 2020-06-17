import React from 'react';
import SearchForm from '../forms/Search-Form';
import styles from './Customer.css';
import CustomerList from './CustomerList';
import NewButton  from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerHeaderTable';
import { listAllCustomers } from '../../actions/customer';

interface Props {
  DisplayCustomerList: boolean;
  CustomerListItems: {
    status: string;
    customerList: [];
    error: [];
  };
}

export default function Customer(props: Props) {
  const {
    listAllCustomers,
    requestCustomerList
  } = props

  console.log("customer Display State", props);

  console.log("display customer list is: ", props.customer.customer.DisplayCustomerList);


    return (
      <div className={styles.container}>
        <div className={styles.btnContainer}>
        {/**   <button
            className={styles.btnContainer}
            onClick={addACustomer}
            data-tclass="btn"
            type="button"
          >
            Add Customer
          </button>*/}
          <NewButton
          buttonName="List Customers"
          ClickHandler={requestCustomerList}
          />
          {/** <SearchForm onSubmit={this.handleSubmit} />*/}
        </div>
        <div className="customerData" data-tid="customerData">
          {props.customer.customer.DisplayCustomerList && <CustomerHeadTable props={props.customer.customerListRequestStatus} />}
        </div>
      </div>
    );
}
