import React from 'react';
import styles from './Customer.css';
import NewButton  from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerHeaderTable';
import CustomerErrorDisplay from './customerError';

interface Props {
  loadingState: boolean;
  loadedState: boolean;
  errorState: boolean;
  customerList: [];
  error: [];
}

export default function Customer(props: Props) {
  console.log("customer component props", props);

  const { requestCustomerList } = props;

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
        {props.customer.customer.loadedState && <CustomerHeadTable props={props.customer.customer.customerList} />}
        {props.customer.customer.errorState && <CustomerErrorDisplay props={props.customer.customer.error} />}
      </div>
    </div>
  );
}
