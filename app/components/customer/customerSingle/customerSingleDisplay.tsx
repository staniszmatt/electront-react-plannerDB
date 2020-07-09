/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import {
  handleEditCustomerForm,
  handleAddCustomerNote,
  handleEditCustomerNote,
  handleDeleteCustomerNote
} from '../../../actions/customer';
import { customerStateType } from '../../../reducers/types';
import AddCustomerNote from '../customerNotes/addCustomerNote';
import EditCustomerNote from '../customerNotes/editCustomerNote';
import CustomerNoteRow from './customerSingleNotes';
import Btn from '../../buttonFunctions/buttonClickHandler';
import styles from './customerSingle.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import CustomerChangeNoteRow from './customerSingleChangeNote';

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: customerStateType) {
  return {
    customer: state
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      handleEditCustomerForm,
      handleAddCustomerNote,
      handleEditCustomerNote,
      handleDeleteCustomerNote,
      reset
    },
    dispatch
  );
}
interface Props {
  handleEditCustomerForm: () => {};
  props: {
    customer: {
      customerName: string;
      customerCodeName: string;
      customerGenStd: boolean;
      customerRsStd: boolean;
      customerActive: boolean;
      changeNoteList: {
        list: [];
      }
    };
    customerNotes: {
      noteList: [];
    };
    singleCustomerNoteID: number;
  }
}

interface NoteDisplayState {
  listNotes: boolean;
  addNote: boolean;
  editNote: boolean;
  customerNote: {
    noteID: number;
    noteText: string;
  };
}

function CustomerHeadTable(props: Props) {
  console.log("Single Customer Props: ", props);
  const {
    handleEditCustomerForm,
    handleAddCustomerNote,
    handleEditCustomerNote,
    handleDeleteCustomerNote
  } = props;

  const [noteDisplayState, setNoteDisplayState] = useState<
    | NoteDisplayState
    | {
        listNotes: boolean;
        addNote: boolean;
        editNote: boolean;
        customerNote: {
          noteID: number;
          noteText: string;
        };
      }
  >({
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

  const editCustomerNote = (_event, props) => {
    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: false,
      addNote: false,
      editNote: true,
      customerNote: {
        noteID: props.props.noteID,
        noteText: props.props.noteText
      }
    });
  };

  const cancelNote = (event, props) => {
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

    props.props.customer.changeNoteList.list.forEach((note: {}, arrIndex: number) => {
        returnNotes.push(
          <CustomerChangeNoteRow
            // eslint-disable-next-line react/no-array-index-key
            key={`customerChangeNote${arrIndex}`}
            props={note}
          />
        );
      }
    );
    return returnNotes;
  };

  const renderRow = (noteArray: []) => {
    const returnNotes: JSX.Element[] = [];

    noteArray.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <CustomerNoteRow
          // eslint-disable-next-line react/no-array-index-key
          key={`customerNote${arrIndex}`}
          props={note}
        />
      );
    });
    return returnNotes;
  };

  const handleDeleteNoteClick = (_event, props) => {
    handleDeleteCustomerNote(props);
  }

  const renderCustomerNotes = () => {
    const customerNoteList = props.props.customerNotes.noteList;
    const returnNoteLists: JSX.Element[] = [];

    Object.keys(customerNoteList).forEach((key, objIndex) => {
      const returnNotes = (
        // eslint-disable-next-line react/no-array-index-key
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`customerNotes${objIndex}`}
          id={`customerNoteID-${key}`}
          className={styles['single-customer-note-wrapper']}
        >
          <div>
            <div>{`Note:${objIndex + 1}`}</div>
            <div>
              <Btn
                props={{
                  noteID: key,
                  noteText: customerNoteList[key].customerNoteText
                }}
                buttonName="Edit Note"
                ClickHandler={editCustomerNote}
              />
            </div>
            <div>
              <Btn
                props={key}
                buttonName="Delete Note"
                ClickHandler={handleDeleteNoteClick}
              />
            </div>
          </div>
          <div>
            <div>
              <textarea disabled={true}>
                {customerNoteList[key].customerNoteText}
              </textarea>
            </div>
          </div>
          <div>
            <div>
              <div>{renderRow(customerNoteList[key].changeNoteList)}</div>
            </div>
          </div>
        </div>
      );
      returnNoteLists.push(returnNotes);
    });
    return returnNoteLists;
  }

  const renderBooleanData = () => {
    const {
      // eslint-disable-next-line react/prop-types
      customerGenStd,
      customerRsStd,
      customerActive
    } = props.props.customer;
    // Setup boolean to string to add to row data
    const genStd = booleanToStringYesNo(customerGenStd);
    const rsStd = booleanToStringYesNo(customerRsStd);
    const active = booleanToStringYesNo(customerActive);

    return (
      <div className={styles["single-customer-status"]}>
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
    handleEditCustomerForm(props.props.customer.customerName);
  };

  return (
    <div className={styles["main-single-customer"]}>
      <div>
        <Btn buttonName="Edit Customer" ClickHandler={editCustomer} />
      </div>
      <div className={styles["single-main-customer-info"]}>
        <div>
          <div>
            <div>Customer:</div>
            <div>{props.props.customer.customerName}</div>
          </div>
          <div>
            <div>Customer Code:</div>
            <div>{props.props.customer.customerCodeName}</div>
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
      <div className={styles["single-customer-notes"]}>
        <div>

          {noteDisplayState.listNotes && (
            <div className={styles["list-customer-note-wrapper"]}>
              <div>
                <div>Customer Notes:</div>
                <Btn buttonName="Add Note" ClickHandler={addCustomerNote} />
              </div>
              <div>{renderCustomerNotes()}</div>
            </div>
          )}

          {noteDisplayState.addNote && (
            <div className={styles["add-customer-note-wrapper"]}>

              <div>
                <AddCustomerNote
                  props={props.props.customer}
                  onSubmit={handleAddCustomerNote}
                />
              </div>
              <div>
                <Btn buttonName="Cancel" ClickHandler={cancelNote} />
              </div>

            </div>
          )}

          {noteDisplayState.editNote && (
            <div className={styles["add-customer-note-wrapper"]}>

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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHeadTable);
