import React from 'react';
import styles from './Customer.css';
import CustomerBtn from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerList/customerHeaderTable';
import CustomerErrorDisplay from '../../errorComponents/ErrorComponent';
import CustomerSearchForm from './customerSearch/customerSearchField';
import CustomerAddFormComponent from './customerAdd/customerAdd';
import CustomerSingleDisplay from './customerSingle/customerSingleDisplay';

interface Props {
  requestCustomerList: () => {};
  handleCustomerSearchForm: () => {};
  customerAddPageSelected: () => {};
  handleCustomerAddForm: () => {};
  loadingState: boolean;
  errorState: boolean;
  loadedCustomerListState: boolean;
  loadedCustomerAddState: boolean;
  loadCustomerAddPage: boolean;
  loadCustomerSinglePage: boolean;
  customerList: [];
  error: [];
}

export default function Customer(props: Props) {
  const {
    requestCustomerList,
    handleCustomerSearchForm,
    customerAddPageSelected,
    handleCustomerAddForm
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles['customer-head-container']}>
        <div className={styles.btnContainer}>
          <CustomerBtn
            buttonName="List Customers"
            ClickHandler={requestCustomerList}
          />
          <CustomerBtn
            buttonName="Add Customer"
            ClickHandler={customerAddPageSelected}
          />
        </div>
        <CustomerSearchForm onSubmit={handleCustomerSearchForm} />
      </div>
      <div className={styles["customer-data"]}>
        {props.customer.customer.loadingState && <div>LOADING</div>}
        {props.customer.customer.errorState && <CustomerErrorDisplay props={props.customer.customer.error} />}
        {props.customer.customer.loadedCustomerListState && <CustomerHeadTable props={props.customer.customer.customerList} />}
        {props.customer.customer.loadCustomerAddPage && <CustomerAddFormComponent onSubmit={handleCustomerAddForm} />}
        {props.customer.customer.loadCustomerSinglePage && <CustomerSingleDisplay /> }
      </div>
    </div>
  );
}
