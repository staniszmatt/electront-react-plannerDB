/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  handleEditCustomerForm,
  handleAddCustomerNote,
  handleEditCustomerNote,
  handleDeleteCustomerNote,
  handleDeleteCustomer
} from '../../../actions/customerActions';
import {
  toggleWarningModalState,
  toggleModalState
} from '../../../actions/modalActions';
import { customerStateType } from '../../../reducers/types';
import NoteList from '../../notesList';
import Btn from '../../buttonFunctions/buttonClickHandler';
import styles from './customerSingleDisplay.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import CustomerChangeNoteRow from '../../singleChangeNote';

// Un-used arguments setup
type unused = unknown;

interface Props {
  handleEditCustomerForm: (customerInfo: string) => {};
  handleAddCustomerNote: (noteRequest: {}) => {};
  handleEditCustomerNote: (noteRequest: {}, _e: unused, props: {}) => {};
  handleDeleteCustomerNote: (deleteProps: {}) => {};
  toggleWarningModalState: (warningModalResp: {}) => {};
  handleDeleteCustomer: () => {};
  toggleModalState: () => {};
  customer: {
    singleCustomerInfo: {
      customer: {
        customerName: string;
        customerCodeName: string;
        customerGenStd: boolean;
        customerRsStd: boolean;
        customerActive: boolean;
        changeNoteList: {
          list: [
            {
              customerNoteText: string;
            }
          ];
        };
      };
      customerNotes: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        noteList: { length: PropertyKey } | any;
        error: string | { length: PropertyKey };
        success: string;
      };
      singleCustomerNoteID: number;
    };
  };
}

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: customerStateType) {
  return {
    customer: state.customer
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      handleEditCustomerForm,
      handleAddCustomerNote,
      handleEditCustomerNote,
      handleDeleteCustomerNote,
      handleDeleteCustomer,
      toggleWarningModalState,
      toggleModalState
    },
    dispatch
  );
}

function CustomerHeadTable(props: Props) {
  const {
    handleEditCustomerForm,
    handleAddCustomerNote,
    handleEditCustomerNote,
    handleDeleteCustomerNote,
    handleDeleteCustomer,
    toggleWarningModalState,
    toggleModalState
  } = props;
  const customerNoteList = {
    handleAddNote: (noteRequest: { addNote: string }) => {
      handleAddCustomerNote(noteRequest);
    },
    handleEditNote: (
      noteRequest: { updateNote: string },
      _e: unused,
      props: { props: { noteID: number } }
    ) => {
      handleEditCustomerNote(noteRequest, _e, props);
    },
    handleDeleteNote: (deleteProps: {}) => {
      handleDeleteCustomerNote(deleteProps);
    },
    state: {
      noteList: props.customer.singleCustomerInfo.customerNotes.noteList,
      itemID: props.customer.singleCustomerInfo.customer.id
    }
  };

  const singleCustomer = props.customer.singleCustomerInfo;

  const renderChangeNoteRow = (list: { forEach: Function }) => {
    const returnNotes: JSX.Element[] = [];

    list.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <CustomerChangeNoteRow
          // eslint-disable-next-line react/no-array-index-key
          key={`customerChangeNote${arrIndex}`}
          // @ts-ignore: Type '{}' is missing
          props={note}
        />
      );
    });
    return returnNotes;
  };

  const renderBooleanData = () => {
    // Disabled validation here, the validation matches but not getting referenced here.
    const {
      // eslint-disable-next-line react/prop-types
      customerGenStd,
      // eslint-disable-next-line react/prop-types
      customerRsStd,
      // eslint-disable-next-line react/prop-types
      customerActive
      // eslint-disable-next-line react/prop-types
    } = singleCustomer.customer;
    // Setup boolean to string to add to row data
    const genStd = booleanToStringYesNo(customerGenStd);
    const rsStd = booleanToStringYesNo(customerRsStd);
    const active = booleanToStringYesNo(customerActive);

    return (
      <div className={styles['single-customer-status']}>
        <div>
          <div>Status:</div>
        </div>
        <div>
          <div>General Standards Approved:</div>
          <div>{genStd}</div>
        </div>
        <div>
          <div>RS Standards Approved:</div>
          <div>{rsStd}</div>
        </div>
        <div>
          <div> Active Customer:</div>
          <div>{active}</div>
        </div>
      </div>
    );
  };

  // Setup so Action isn't called until the button is clicked.
  const editCustomer = () => {
    handleEditCustomerForm(singleCustomer.customer.customerName);
  };

  const deleteCustomer = () => {
    const warningModalResp = {
      warningMsg: 'Do you really want to delete this customer note?',
      actionFunction: () => {
        handleDeleteCustomer();
      },
      closeModal: () => {
        toggleModalState();
      }
    };
    toggleWarningModalState(warningModalResp);
  };

  return (
    <div className={styles['main-single-customer']}>
      <div>
        <div>
          <Btn buttonName="Edit Customer" ClickHandler={editCustomer} />
        </div>
        <div className={styles['delete-btn']}>
          <Btn buttonName="DELETE CUSTOMER" ClickHandler={deleteCustomer} />
        </div>
      </div>
      <div className={styles['single-main-customer-info']}>
        <div>
          <div>
            <div>Customer:</div>
            <div>{singleCustomer.customer.customerName}</div>
          </div>
          <div>
            <div>Customer Code:</div>
            <div>{singleCustomer.customer.customerCodeName}</div>
          </div>
          <div>{renderBooleanData()}</div>
        </div>
        <div>
          <div>
            <div>Change History:</div>
          </div>
          <div>
            <div>
              {renderChangeNoteRow(singleCustomer.customer.changeNoteList.list)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <NoteList props={customerNoteList} />
      </div>
    </div>
  );
}
// TODO: Figure out how to fix this type script error or fix typescript rule.
// @ts-ignore: Argument of type '(props: Props)'
export default connect(mapStateToProps, mapDispatchToProps)(CustomerHeadTable);
