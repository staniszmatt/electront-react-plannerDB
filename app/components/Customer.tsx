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
  DisplayAddCustomer: boolean,
  CustomerListItems: {},
  CustomerID: number,
  error: {}
};

interface DispatchProps {
  listAllCustomers: () => void;
  editCustomer: () => void;
  addACustomer: () => void;
  searchACustomer: () => void;
}

export default function Customer(props: Props) {
  const {
    listAllCustomers,
    editCustomer,
    addACustomer,
    searchACustomer,
    customer
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
          <div style={{display: props.customer.customer.DisplayCustomerList ? "block" : "none"}}>
            <CustomerHeadTable props={props} />
          </div>
        </div>
      </div>
    );
}
