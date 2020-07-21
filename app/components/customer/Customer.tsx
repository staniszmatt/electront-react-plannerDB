/* eslint-disable react/destructuring-assignment */
/* eslint-disable prettier/prettier */
import React from 'react';
import styles from '../styling/pageHeaderBar.css';
import CustomerBtn from '../buttonFunctions/buttonClickHandler';
import CustomerHeadTable from './customerList/customerHeaderTable';
import CustomerErrorDisplay from '../../errorComponents/ErrorComponent';
import CustomerSearchForm from './customerSearch/customerSearchField';
import CustomerAddFormComponent from './customerAdd/customerAdd';
import LoadingScreen from '../LoadingDisplay';
import CustomerSingleDisplay from './customerSingle/customerSingleDisplay';
import CustomerEditFormComponent from './customerEdit/customerEditPage';

export type singleCustomer = {
  changeNoteList: {
    list: [];
  };
  customerActive: boolean;
  customerGenStd: boolean;
  customerRsStd: boolean;
  customerCodeName: string;
  customerName: string;
  id: number;
  success: string;
  customerNotes: {
    error: string;
    noteList: {};
    success: string;
  }
  error: {};
};

interface Props {
  requestCustomerList: () => {};
  handleCustomerSearchForm: () => {};
  customerAddPageSelected: () => {};
  handleCustomerAddForm: () => {};
  handleEditCustomerSubmit: () => {};
  customer: {
    loadingState: boolean;
    errorState: boolean;
    loadedCustomerListState: boolean;
    loadedCustomerAddState: boolean;
    loadCustomerAddPage: boolean;
    loadCustomerSinglePage: boolean;
    loadCustomerEditPage: boolean
    customerList: [];
    singleCustomerInfo: {
      customer: singleCustomer;
    };
    singleCustomerNoteID: number;
    error: [];
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
      {props.customer.loadingState && <LoadingScreen />}
      <div className={styles['page-head-container']}>
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
      <div className={styles["page-data"]}>
        {props.customer.errorState && <CustomerErrorDisplay props={props.customer.error} />}
        {props.customer.loadedCustomerListState && <CustomerHeadTable props={props.customer.customerList} />}
        {props.customer.loadCustomerAddPage && <CustomerAddFormComponent onSubmit={handleCustomerAddForm} />}
        {props.customer.loadCustomerSinglePage && <CustomerSingleDisplay /> }
        {props.customer.loadCustomerEditPage && <CustomerEditFormComponent onSubmit={handleEditCustomerSubmit} props={props.customer.singleCustomerInfo} /> }
      </div>
    </div>
  );
}
