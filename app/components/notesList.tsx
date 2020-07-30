/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import {
  toggleWarningModalState,
  toggleModalState
} from '../actions/modalActions';
import { modalStateType } from '../reducers/types';
import SingleChangeNote from './singleChangeNote';
import AddNote from './addNote';
import EditNote from './editNote';
import Btn from './buttonFunctions/buttonClickHandler';
import styles from './notesList.css';
import isObjEmpty from '../helpFunctions/isObjEmpty';

interface Props {
  toggleWarningModalState: (warningModalResp: {}) => {};
  toggleModalState: () => {};
  reset: (formReset: string) => {};
  props: {
    handleAddNote: () => {};
    handleEditNote: () => {};
    handleDeleteNote: (deleteProps: {}) => {};
    state: {
      noteList: {
        [noteListNumber: number]: {
          noteText: string;
          changeNoteList: [];
        };
      };
      itemID: number;
    };
  };
}

function mapStateToProps(state: modalStateType) {
  return {
    modals: state.modals
  };
}

function mapDispatchToProps(dispatch: Dispatch<null>) {
  return bindActionCreators(
    {
      toggleWarningModalState,
      toggleModalState,
      reset
    },
    dispatch
  );
}

function noteList(props: Props) {
  const noteList = props.props.state.noteList;
  const { handleAddNote, handleEditNote, handleDeleteNote } = props.props;

  const { toggleWarningModalState, toggleModalState, reset } = props;

  const [noteDisplayState, setNoteDisplayState] = useState<{
    listNotes: boolean;
    addNote: boolean;
    editNote: boolean;
    noteInfo: {
      noteID: number | null;
      noteText: string;
    };
  }>({
    listNotes: true,
    addNote: false,
    editNote: false,
    noteInfo: {
      noteID: null,
      noteText: ''
    }
  });

  const addNote = () => {
    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: false,
      addNote: true,
      editNote: false,
      noteInfo: {
        noteID: null,
        noteText: ''
      }
    });
  };

  const editNote = (
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
      noteInfo: {
        noteID: editNoteProps.props.noteID,
        noteText: editNoteProps.props.noteText
      }
    });
  };

  const handleDeleteNoteClick = (_event: {}, deleteProps: {}) => {
    const warningModalResp = {
      warningMsg: 'Do you really want to delete this note?',
      actionFunction: () => {
        handleDeleteNote(deleteProps);
      },
      closeModal: () => {
        toggleModalState();
      }
    };
    toggleWarningModalState(warningModalResp);
  };

  const cancelNote = () => {
    // Clear forms if canceled.
    reset('editNote');
    reset('addNote');

    setNoteDisplayState({
      ...noteDisplayState,
      listNotes: true,
      addNote: false,
      editNote: false,
      noteInfo: {
        noteID: null,
        noteText: ''
      }
    });
  };

  const renderChangeNoteRow = (list: { forEach: Function }) => {
    const returnNotes: JSX.Element[] = [];

    list.forEach((note: {} | any, arrIndex: number) => {
      returnNotes.push(
        <SingleChangeNote
          // eslint-disable-next-line react/no-array-index-key
          key={`changeNote${arrIndex}`}
          props={note}
        />
      );
    });
    return returnNotes;
  };

  const renderNotes = () => {
    const returnNoteLists: JSX.Element[] = [];

    if (isObjEmpty(noteList)) {
      return <div>NO NOTES HAVE BEEN ADDED!</div>;
    }

    Object.keys(noteList).forEach((noteListKey: string, objIndex: number) => {
      const noteListNumber = parseInt(noteListKey, 10);
      const returnNotes = (
        // eslint-disable-next-line react/no-array-index-key
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`note${objIndex}`}
          id={`noteID-${noteListKey}`}
          className={styles['single-note-wrapper']}
        >
          <div>
            <div>{`Note:${objIndex + 1}`}</div>
            <div>
              <Btn
                props={{
                  noteID: noteListKey,
                  noteText: noteList[noteListNumber].noteText
                }}
                buttonName="Edit Note"
                ClickHandler={editNote}
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
              <textarea disabled>{noteList[noteListNumber].noteText}</textarea>
            </div>
          </div>
          <div>
            <div>
              <div>
                {renderChangeNoteRow(noteList[noteListNumber].changeNoteList)}
              </div>
            </div>
          </div>
        </div>
      );
      returnNoteLists.push(returnNotes);
    });
    return returnNoteLists;
  };

  return (
    <div className={styles['single-notes']}>
      <div>
        {noteDisplayState.listNotes && (
          <div className={styles['list-note-wrapper']}>
            <div>
              <div>Part Number Notes:</div>
              <Btn buttonName="Add Note" ClickHandler={addNote} />
            </div>
            <div>{renderNotes()}</div>
          </div>
        )}
        {noteDisplayState.addNote && (
          <div className={styles['add-note-wrapper']}>
            <div>
              <AddNote
                props={noteDisplayState.noteInfo}
                // eslint-disable-next-line react/destructuring-assignment
                onSubmit={handleAddNote}
              />
            </div>
            <div>
              <Btn buttonName="Cancel" ClickHandler={cancelNote} />
            </div>
          </div>
        )}
        {noteDisplayState.editNote && (
          <div className={styles['add-note-wrapper']}>
            <div>
              <EditNote
                props={noteDisplayState.noteInfo}
                onSubmit={handleEditNote}
              />
            </div>
            <div>
              <Btn buttonName="Cancel" ClickHandler={cancelNote} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(noteList);
