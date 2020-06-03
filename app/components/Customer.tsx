/* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
import * as React  from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './forms/Search-Form';
import routes from '../constants/routes.json';
import styles from './Customer.css';
import CustomerList from './CustomerList';
import { render } from 'enzyme';
import { initialize } from 'redux-form';
import { ipcRenderer } from 'electron';
import { setMaxListeners, listenerCount } from 'cluster';
import NewButton  from './buttonFunctions/displayCustomer';

//setup props
interface CustomerProps {
  DefaultStatus: showCustomerList;
  CustomerListItems:[];
}
//setup state
interface CustomerState {
  Status: showCustomerList;
  CustomerListItems: [];
}
//Create all prop status
type showCustomerList = false | true;

export default class Customer extends React.Component<CustomerProps, CustomerState> {
  //set defautl props
  static defaultProps = {
    DefaultStatus: false,
    CustomerListItems: []
  }
  //set defaut state
  state = {
    Status: this.props.DefaultStatus,
    CustomerListItems: this.props.CustomerListItems
  }

  toggleCustomerList = () => {
    console.log('toggle state', this.state.Status);

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


  renderCustomerList() {
    this.props.CustomerListItems = this.state.CustomerListItems;
    console.log('setup for customer divs');
    const customerItem = this.props.CustomerListItems.map((CustomerListItems) =>{
      return <CustomerList key={CustomerListItems.id} {...CustomerListItems} />
    })


  }

  render() {
    const customerItem = this.state.CustomerListItems.map((CustomerListItems) =>{
      return <CustomerList key={CustomerListItems.id} {...CustomerListItems} />
    })

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
          <div>
            {this.state.Status && customerItem}
          </div>
        </div>
      </div>
    );
  }
}

const el = <Customer />
