/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  handleEditCustomerForm,
  handleCustomerSearchForm
} from '../../../actions/customerActions';
import { customerStateType } from '../../../reducers/types';
import EditButton from '../../buttonFunctions/buttonClickHandler';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import styles from './customerList.css';

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: customerStateType) {
  return {
    customer: state.customer
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    { handleEditCustomerForm, handleCustomerSearchForm },
    dispatch
  );
}
// Typescript to show prop is a function.
interface Props {
  handleEditCustomerForm: (customerName: string) => {};
  handleCustomerSearchForm: (resp: { customerSearch: string }) => {};
  props: {
    id: number;
    customerName: string;
    customerCodeName: string;
    customerGenStd: boolean;
    customerRsStd: boolean;
    customerActive: boolean;
  };
}

function CustomerRow(props: Props) {
  const {
    id,
    customerName,
    customerCodeName,
    customerGenStd,
    customerRsStd,
    customerActive
  } = props.props;

  const { handleEditCustomerForm, handleCustomerSearchForm } = props;
  const newID = id.toString();

  // Setup boolean to string to add to row data
  const genStd = booleanToStringYesNo(customerGenStd);
  const rsStd = booleanToStringYesNo(customerRsStd);
  const active = booleanToStringYesNo(customerActive);

  const handleEditButton = () => {
    handleEditCustomerForm(customerName);
  };

  const handleClickCustomerButton = () => {
    const resp = {
      customerSearch: customerName
    };
    handleCustomerSearchForm(resp);
  };

  return (
    <tr className={styles['t-row']} id={newID}>
      <td>
        <button type="button" onClick={handleClickCustomerButton}>
          {customerName}
        </button>
      </td>
      <td>{customerCodeName}</td>
      <td>{genStd}</td>
      <td>{rsStd}</td>
      <td>{active}</td>
      <td>
        <EditButton buttonName="EDIT" ClickHandler={handleEditButton} />
      </td>
    </tr>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRow);
