/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { reset } from 'redux-form';
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
import AddCustomerNote from '../customerNotes/addCustomerNote';
import EditCustomerNote from '../customerNotes/editCustomerNote';
import CustomerNoteRow from './customerSingleNotes';
import Btn from '../../buttonFunctions/buttonClickHandler';
import styles from './customerSingle.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import CustomerChangeNoteRow from './customerSingleChangeNote';

interface Props {
  handleEditCustomerForm: (customerInfo: string) => {};
  handleAddCustomerNote: () => {};
  handleEditCustomerNote: () => {};
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
        noteList: {} | any;
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
      toggleModalState,
      reset
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
  const singleCustomer = props.customer.singleCustomerInfo;
  // useState setup with typescript defaults
  const [noteDisplayState, setNoteDisplayState] = useState<{
    listNotes: boolean;
    addNote: boolean;
    editNote: boolean;
    customerNote: {
      noteID: number | null;
      noteText: string;
    };
  }>({
    listNotes: true,
    addNote: false,
    editNote: false,
    customerNote: {
      noteID: null,
      noteText: ''
    }
  });

  const addCustomerNote = () => {
    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: false,
      addNote: true,
      editNote: false,
      customerNote: {
        noteID: null,
        noteText: ''
      }
    });
  };

  const editCustomerNote = (
    _event: {},
    editNoteProps: {
      props: {
        noteID: number;
        noteText: string;
      };
    }
  ) => {
    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: false,
      addNote: false,
      editNote: true,
      customerNote: {
        noteID: editNoteProps.props.noteID,
        noteText: editNoteProps.props.noteText
      }
    });
  };

  const cancelNote = () => {
    // Clear forms if canceled.
    reset('customerEditNote');
    reset('customerAddNote');

    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: true,
      addNote: false,
      editNote: false,
      customerNote: {
        noteID: null,
        noteText: ''
      }
    });
  };

  const renderChangeNoteRow = () => {
    const returnNotes: JSX.Element[] = [];

    singleCustomer.customer.changeNoteList.list.forEach(
      (note: {}, arrIndex: number) => {
        returnNotes.push(
          <CustomerChangeNoteRow
            // eslint-disable-next-line react/no-array-index-key
            key={`customerChangeNote${arrIndex}`}
            // @ts-ignore: Type '{}' is missing
            props={note}
          />
        );
      }
    );
    return returnNotes;
  };

  const renderRow = (noteArray: []) => {
    const returnNotes: JSX.Element[] = [];
    // TODO: Figure out how to fix the typescript rule here,
    // Either need to fix this rule our add " : {} " to the end of the other to component file interfaces
    // and fix them.
    noteArray.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <CustomerNoteRow
          // eslint-disable-next-line react/no-array-index-key
          key={`customerNote${arrIndex}`}
          // @ts-ignore: Type '{}' is missing
          props={note}
        />
      );
    });
    return returnNotes;
  };

  const handleDeleteNoteClick = (_event: {}, deleteProps: {}) => {
    const warningModalResp = {
      warningMsg: 'Do you really want to delete this customer note?',
      actionFunction: () => {
        handleDeleteCustomerNote(deleteProps);
      },
      closeModal: () => {
        toggleModalState();
      }
    };
    toggleWarningModalState(warningModalResp);
  };

  const renderCustomerNotes = () => {
    const customerNoteList = singleCustomer.customerNotes.noteList;
    const returnNoteLists: JSX.Element[] = [];

    Object.keys(customerNoteList).forEach(
      (noteListKey: string, objIndex: number) => {
        const noteListNumber = parseInt(noteListKey, 10);
        const returnNotes = (
          // eslint-disable-next-line react/no-array-index-key
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`customerNotes${objIndex}`}
            id={`customerNoteID-${noteListKey}`}
            className={styles['single-customer-note-wrapper']}
          >
            <div>
              <div>{`Note:${objIndex + 1}`}</div>
              <div>
                <Btn
                  props={{
                    noteID: noteListKey,
                    noteText: customerNoteList[noteListNumber].customerNoteText
                  }}
                  buttonName="Edit Note"
                  ClickHandler={editCustomerNote}
                />
              </div>
              <div className={styles['delete-btn']}>
                <Btn
                  props={noteListKey}
                  buttonName="Delete Note"
                  ClickHandler={handleDeleteNoteClick}
                />
              </div>
            </div>
            <div>
              <div>
                <textarea disabled={true}>
                  {customerNoteList[noteListNumber].customerNoteText}
                </textarea>
              </div>
            </div>
            <div>
              <div>
                <div>
                  {renderRow(customerNoteList[noteListNumber].changeNoteList)}
                </div>
              </div>
            </div>
          </div>
        );
        returnNoteLists.push(returnNotes);
      }
    );
    return returnNoteLists;
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
            <div>{renderChangeNoteRow()}</div>
          </div>
        </div>
      </div>
      <div className={styles['single-customer-notes']}>
        <div>
          {noteDisplayState.listNotes && (
            <div className={styles['list-customer-note-wrapper']}>
              <div>
                <div>Customer Notes:</div>
                <Btn buttonName="Add Note" ClickHandler={addCustomerNote} />
              </div>
              <div>{renderCustomerNotes()}</div>
            </div>
          )}

          {noteDisplayState.addNote && (
            <div className={styles['add-customer-note-wrapper']}>
              <div>
                <AddCustomerNote
                  props={singleCustomer.customer}
                  onSubmit={handleAddCustomerNote}
                />
              </div>
              <div>
                <Btn buttonName="Cancel" ClickHandler={cancelNote} />
              </div>
            </div>
          )}

          {noteDisplayState.editNote && (
            <div className={styles['add-customer-note-wrapper']}>
              <div>
                <EditCustomerNote
                  props={noteDisplayState.customerNote}
                  onSubmit={handleEditCustomerNote}
                />
              </div>
              <div>
                <Btn buttonName="Cancel" ClickHandler={cancelNote} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// TODO: Figure out how to fix this type script error or fix typescript rule.
// @ts-ignore: Argument of type '(props: Props)'
export default connect(mapStateToProps, mapDispatchToProps)(CustomerHeadTable);
