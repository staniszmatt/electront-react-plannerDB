import React from 'react';
import styles from './Customer.css';
import NewButton from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerList/customerHeaderTable';
import CustomerErrorDisplay from './customerError';
import CustomerSearchForm from './customerSearch/customerSearchField';

interface Props {
  searchCustomerState: boolean;
  loadingState: boolean;
  loadedState: boolean;
  errorState: boolean;
  customerList: [];
  error: [];
}

export default function Customer(props: Props) {
  console.log("customer component props", props);

  const { requestCustomerList, searchForCustomer, handleCustomerSearchForm } = props;

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
        <NewButton
          buttonName="Search Customer"
          ClickHandler={searchForCustomer}
        />
        {/** <SearchForm onSubmit={this.handleSubmit} />*/}
      </div>
      <div className="customerData" data-tid="customerData">
        {props.customer.customer.loadingState && <div>LOADING</div>}
        {props.customer.customer.errorState && <CustomerErrorDisplay props={props.customer.customer.error} />}
        {props.customer.customer.loadedState && <CustomerHeadTable props={props.customer.customer.customerList} />}
        {props.customer.customer.searchCustomerState && <CustomerSearchForm onSubmit={handleCustomerSearchForm} />}
      </div>
    </div>
  );
}
