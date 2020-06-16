/* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
import React, { Component, ReactNode, PureComponent }  from 'react';
import SearchForm from './forms/Search-Form';
import styles from './Customer.css';
import CustomerList from './CustomerList';
import NewButton  from './buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './tables/customerHeaderTable';
import { listAllCustomers, addACustomer } from '../actions/customer';

interface Props {
  DisplayCustomerList: boolean,
  CustomerListItems: {
    customerList: [],
    gettingCustomerList: boolean,
    haveCustomerList: boolean,
    error: []
  }
  DisplayAddCustomer: boolean
  // CustomerID: number,
};

export default function Customer(props: Props) {
  const {
    listAllCustomers,
    // editCustomer,
    // addACustomer,
    // searchACustomer,
  } = props

  console.log("customer Display State", props);
  console.log("display customer list is: ", props.customer.customer.DisplayCustomerList);



    return (
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <button
            className={styles.btnContainer}
            onClick={addACustomer}
            data-tclass="btn"
            type="button"
          >
            Add Customer
          </button>
          <NewButton buttonName="List Customers" ClickHandler={listAllCustomers} />
          {/** <SearchForm onSubmit={this.handleSubmit} />*/}
        </div>
        <div className="customerData" data-tid="customerData">
          {props.customer.customer.DisplayCustomerList && <CustomerHeadTable props={props} />}
        </div>
      </div>
    );
}
