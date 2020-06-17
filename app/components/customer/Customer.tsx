import React from 'react';
import SearchForm from '../forms/Search-Form';
import styles from './Customer.css';
import CustomerList from './CustomerList';
import NewButton  from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerHeaderTable';
// import { requestCustomerList } from '../../actions/customer';

interface Props {
  loadingState: boolean;
  loadedState: boolean;
  errorState: boolean;
  customerList: [];
  error: [];
}

export default function Customer(props: Props) {
  const { requestCustomerList } = props;

  console.log("customer Display State loading", props.customer.customer.loadingState);
  console.log("customer Display State loading", props.customer.customer.loadedState);
  console.log("customer Display State loading", props.customer.customer.errorState);
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
          {props.customer.customer.loadingState && <div>LOADING</div>}
          {props.customer.customer.loadedState && <CustomerHeadTable props={props.customer.customerListRequestStatus} />}
          {props.customer.customer.errorState && <div>ERROR</div>}
        </div>
      </div>
    );
}
