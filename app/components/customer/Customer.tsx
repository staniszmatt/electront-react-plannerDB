import React from 'react';
import styles from './Customer.css';
import NewButton from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerList/customerHeaderTable';
import CustomerErrorDisplay from '../../errorComponents/ErrorComponent';
import CustomerSearchForm from './customerSearch/customerSearchField';

interface Props {
  loadingState: boolean;
  errorState: boolean;
  loadedCustomerListState: boolean;
  loadedCustomerAddState: boolean;
  customerList: [];
  error: [];
}

export default function Customer(props: Props) {
  console.log("customer component props", props);

  const { requestCustomerList, handleCustomerSearchForm } = props;

  // TODO: Temp setup for add customer button, Remove once compeleted!
  const testAddCustomerBtn = () => {
    console.log('Add Customer Btn Works!');
  }

  return (
    <div className={styles.container}>
      <div className={styles['customer-head-container']}>
        <div className={styles.btnContainer}>
          <NewButton
            buttonName="List Customers"
            ClickHandler={requestCustomerList}
          />
          <NewButton
            buttonName="Add Customer"
            ClickHandler={testAddCustomerBtn}
          />
        </div>
        <CustomerSearchForm onSubmit={handleCustomerSearchForm} />
      </div>
      <div className="customerData" data-tid="customerData">
        {props.customer.customer.loadingState && <div>LOADING</div>}
        {props.customer.customer.errorState && <CustomerErrorDisplay props={props.customer.customer.error} />}
        {props.customer.customer.loadedCustomerListState && <CustomerHeadTable props={props.customer.customer.customerList} />}
      </div>
    </div>
  );
}
