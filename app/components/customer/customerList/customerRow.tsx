import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  handleEditCustomerForm,
  handleCustomerSearchForm
} from '../../../actions/customer';
import { customerStateType } from '../../../reducers/types';
import EditButton from '../../buttonFunctions/buttonClickHandler';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import styles from './customerlist.css';

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: customerStateType) {
  return {
    customer: state
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    { handleEditCustomerForm, handleCustomerSearchForm },
    dispatch
  );
}
// Typescript to show prop is a function.
interface Props {
  handleEditCustomerForm: () => {};
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

  // Setup boolean to string to add to row data
  const genStd = booleanToStringYesNo(customerGenStd);
  const rsStd = booleanToStringYesNo(customerRsStd);
  const acitve = booleanToStringYesNo(customerActive);

  const handleEditButton = () => {
    handleEditCustomerForm(customerName);
  };

  const handleClickCustomerButton = (event) => {
    console.log("handle customer click event", event)
    const resp = {
      customerSearch: customerName
    };
    handleCustomerSearchForm(resp);
    console.log("Customer Name Clicked!")
  };

  return (
    <tr className={styles["t-row"]}>
      <td onClick={handleClickCustomerButton}>{customerName}</td>
      <td>{customerCodeName}</td>
      <td>{genStd}</td>
      <td>{rsStd}</td>
      <td>{acitve}</td>
      <td>
        <EditButton buttonName="EDIT" ClickHandler={handleEditButton} />
      </td>
    </tr>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRow);
