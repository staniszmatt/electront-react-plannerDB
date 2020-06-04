/* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
import * as React  from 'react';
import { ipcRenderer } from 'electron';
import SearchForm from './forms/Search-Form';
import styles from './Customer.css';
import CustomerList from './CustomerList';
import NewButton  from './buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './tables/customerHeaderTable'

//setup props
interface CustomerProps {
  Status: showCustomerList; //Only default required, deafult is setting limited options
  CustomerListItems:[];
  CustomerID: number;
}
//setup state
interface CustomerState {
  Status: showCustomerList;
  CustomerListItems: [];
  CustomerID: number;
}
//Create all prop status
type showCustomerList = false | true;

export default class Customer extends React.Component<CustomerProps, CustomerState> {
  //set defautl props
  static defaultProps = {
    DefaultStatus: false,
    CustomerListItems: [],
    CustomerID: 0
  }
  //set defaut state
  state = {
    Status: this.props.Status,
    CustomerListItems: this.props.CustomerListItems,
    CustomerID: this.props.CustomerID
  }

  toggleCustomerList = () => {
    this.setState((prevState) => {
      if (prevState.Status) {
        return {Status: false}
      }
      return { Status: true };
    });
    if (!this.state.Status) {
      this.getCustomers();
    }
  }

  //buttons
  addCustomer () {
    console.log("add Customer");
  }

  handleSubmit () {
    console.log("handle Subbmit");
  }

  getCustomers () {
    console.log("show all customers");

    const requestData = {testRequestString: "Request Customers!"};
    ipcRenderer.send('asynchronous-message', requestData);

    ipcRenderer.on('asynchronous-reply', (event, resp) => {
      // console.log("getCustomer: Pull Data", resp);
      this.setState({
        CustomerListItems: resp
      })
    });
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <button
            className={styles.btnContainer}
            onClick={this.addCustomer}
            data-tclass="btn"
            type="button"
          >
            Add Customer
          </button>
          <NewButton className={styles.btnContainer} buttonName="List Customers" ClickHandler={this.toggleCustomerList} />

          <SearchForm onSubmit={this.handleSubmit} />
        </div>
        <div className="customerData" data-tid="customerData">
         <div style={{display: this.state.Status ? "block" : "none"}}>
            <CustomerHeadTable props={this.state.CustomerListItems} />
          </div>
        </div>
      </div>
    );
  }
}

const el = <Customer />
