/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import styles from './Customer.css';
import CustomerBtn from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerList/customerHeaderTable';
import CustomerErrorDisplay from '../../errorComponents/ErrorComponent';
import CustomerSearchForm from './customerSearch/customerSearchField';
import CustomerAddFormComponent from './customerAdd/customerAdd';
import CustomerSingleDisplay from './customerSingle/customerSingleDisplay';
import CustomerEditFormComponent from './customerEdit/customerEditPage';

interface Props {
  requestCustomerList: () => {};
  handleCustomerSearchForm: () => {};
  customerAddPageSelected: () => {};
  handleCustomerAddForm: () => {};
  handleEditCustomerSubmit: () => {};
  state: {
    customer: {
      loadingState: boolean;
      errorState: boolean;
      loadedCustomerListState: boolean;
      loadedCustomerAddState: boolean;
      loadCustomerAddPage: boolean;
      loadCustomerSinglePage: boolean;
      loadCustomerEditPage: boolean
      customerList: [];
      singleCustomerInfo: {};
      error: [];
    }
  }
}

export default function Customer(props: Props) {
  const {
    requestCustomerList,
    handleCustomerSearchForm,
    customerAddPageSelected,
    handleCustomerAddForm,
    handleEditCustomerSubmit
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
        {props.state.customer.loadingState && <div>LOADING</div>}
        {props.state.customer.errorState && <CustomerErrorDisplay props={props.state.customer.error} />}
        {props.state.customer.loadedCustomerListState && <CustomerHeadTable props={props.state.customer.customerList} />}
        {props.state.customer.loadCustomerAddPage && <CustomerAddFormComponent onSubmit={handleCustomerAddForm} />}
        {props.state.customer.loadCustomerSinglePage && <CustomerSingleDisplay props={props.state.customer.singleCustomerInfo} /> }
        {props.state.customer.loadCustomerEditPage && <CustomerEditFormComponent onSubmit={handleEditCustomerSubmit} props={props.state.customer.singleCustomerInfo} /> }
      </div>
    </div>
  );
}
