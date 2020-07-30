/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  handleAddPartNumNote,
  handleEditPartNumNote,
  handleDeletePartNumNote,
  handleEditPartNumForm,
  handleDeletePartNumber
} from '../../../actions/partNumbersActions';
import NoteList from '../../notesList';
import {
  toggleWarningModalState,
  toggleModalState
} from '../../../actions/modalActions';
import { partNumbersStateType } from '../../../reducers/types';
import Btn from '../../buttonFunctions/buttonClickHandler';
import styles from './partNumberSingleDisplay.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import ChangeNoteRow from '../../singleChangeNote';

// Un-used arguments setup
type unused = unknown;
interface Props {
  // handleEditCustomerForm: (customerInfo: string) => {};
  toggleWarningModalState: (warningModalResp: {}) => {};
  // handleDeleteCustomer: () => {};
  toggleModalState: () => {};
  handleAddPartNumNote: (noteRequest: {}) => {};
  handleEditPartNumForm: (partNumberName: string) => {};
  handleEditPartNumNote: (
    noteRequest: { updateNote: string },
    _e: unused,
    props: { props: { noteID: number } }
  ) => {};
  handleDeletePartNumNote: (deleteProps: { updateNote: string }) => {};
  handleDeletePartNumber: () => {};
  partNumbers: {
    singlePartNumber: {
      partNumberNotes: {
        noteList: [];
      };
      singlePartNumber: {
        changeNoteList: {
          list: [
            {
              changeNoteDateStamp: string;
              changeNoteDescription: string;
              changeNoteID: number;
              typeCategory: string;
              userID: string;
            }
          ];
        };
        id: number;
        partNumberMaterial: string;
        partNumberName: string;
        partNumberSerialNumberRequired: boolean;
        partNumberSetForProduction: boolean;
      };
    };
  };
}

// Has to be mapped in order for dispatch to work.
function mapStateToProps(state: partNumbersStateType) {
  return {
    partNumbers: state.partnumbers
  };
}
// Mapping actions to component without having to pass it through the parents.
function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      handleAddPartNumNote,
      handleEditPartNumNote,
      handleDeletePartNumNote,
      handleEditPartNumForm,
      handleDeletePartNumber,
      toggleWarningModalState,
      toggleModalState
    },
    dispatch
  );
}

function PartNumberSingleDisplay(props: Props) {
  const {
    handleAddPartNumNote,
    handleEditPartNumNote,
    handleDeletePartNumNote,
    handleEditPartNumForm,
    handleDeletePartNumber,
    toggleWarningModalState,
    toggleModalState
  } = props;
  // Set type to any, types set on here any on props of notesList.tsx file
  // eslint-disable-next-line prettier/prettier
  const partNumberInfo: any = props.partNumbers.singlePartNumber.singlePartNumber;
  // eslint-disable-next-line prettier/prettier
  const partNumberChangeNoteList = props.partNumbers.singlePartNumber.singlePartNumber.changeNoteList.list;
  const partNumberNoteList: any = {
    handleAddNote: (noteRequest: { addNote: string }) => {
      handleAddPartNumNote(noteRequest);
    },
    handleEditNote: (
      noteRequest: { updateNote: string },
      _e: unused,
      props: { props: { noteID: number } }
    ) => {
      handleEditPartNumNote(noteRequest, _e, props);
    },
    handleDeleteNote: (deleteProps: { updateNote: string }) => {
      handleDeletePartNumNote(deleteProps);
    },
    state: {
      noteList: props.partNumbers.singlePartNumber.partNumberNotes.noteList,
      itemID: props.partNumbers.singlePartNumber.singlePartNumber.id
    }
  };

  const renderChangeNoteRow = (list: { forEach: Function }) => {
    const returnNotes: JSX.Element[] = [];

    list.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <ChangeNoteRow
          // eslint-disable-next-line react/no-array-index-key
          key={`changeNote${arrIndex}`}
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
      partNumberSerialNumberRequired,
      // eslint-disable-next-line react/prop-types
      partNumberSetForProduction
    } = partNumberInfo;

    // Setup boolean to string to add to row data
    const serialNumReq = booleanToStringYesNo(partNumberSerialNumberRequired);
    const setForProd = booleanToStringYesNo(partNumberSetForProduction);

    return (
      <div className={styles['single-status']}>
        <div>
          <div>Status:</div>
        </div>
        <div>
          <div>Serial Number Required:</div>
          <div>{serialNumReq}</div>
        </div>
        <div>
          <div>Set For Production:</div>
          <div>{setForProd}</div>
        </div>
      </div>
    );
  };

  // Setup so Action isn't called until the button is clicked.
  const editPartNumber = () => {
    handleEditPartNumForm(
      props.partNumbers.singlePartNumber.singlePartNumber.partNumberName
    );
  };

  const deleteCustomer = () => {
    const warningModalResp = {
      warningMsg:
        'Do you really want to delete the part number and everything referenced to it?',
      actionFunction: () => {
        handleDeletePartNumber();
      },
      closeModal: () => {
        toggleModalState();
      }
    };
    toggleWarningModalState(warningModalResp);
  };

  return (
    <div className={styles['main-single']}>
      <div>
        <div>
          <Btn buttonName="Edit Part Number" ClickHandler={editPartNumber} />
        </div>
        <div className={styles['delete-btn']}>
          <Btn buttonName="DELETE Part Number" ClickHandler={deleteCustomer} />
        </div>
      </div>
      <div className={styles['single-main-info']}>
        <div>
          <div>
            <div>Part Number:</div>
            <div>{partNumberInfo.partNumberName}</div>
          </div>
          <div>
            <div>Material Type:</div>
            <div>{partNumberInfo.partNumberMaterial}</div>
          </div>
          <div>{renderBooleanData()}</div>
        </div>
        <div>
          <div>
            <div>Change History:</div>
          </div>
          <div>
            <div>{renderChangeNoteRow(partNumberChangeNoteList)}</div>
          </div>
        </div>
      </div>

      <div>
        <NoteList props={partNumberNoteList} />
      </div>
    </div>
  );
}
// TODO: Figure out how to fix this type script error or fix typescript rule.
// @ts-ignore: Argument of type '(props: Props)'
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartNumberSingleDisplay);
