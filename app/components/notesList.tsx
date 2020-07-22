import React, { useState } from 'react';
import SingleChangeNote from './singleChangeNote';
import AddNote from './addNote';
import EditNote from './editNote';

interface Props {
  noteType: string;
  noteList: {
    [id: number]: {
      changeNoteList: [];
    };
  };
  editNote: () => {};
  deleteNote: () => {};
  addNote: () => {};
  handleAdd: () => {};
  handleEdit: () => {};
  handleDelete: () => {};
}

export default function noteList(props: Props) {



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

  const addCustomerNote = () => {
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
      noteInfo: {
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
      noteInfo: {
        noteID: null,
        noteText: ''
      }
    });
  };



  const renderChangeNoteRow = (list: { forEach: Function }) => {
    const returnNotes: JSX.Element[] = [];

    list.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <SingleChangeNote
          // eslint-disable-next-line react/no-array-index-key
          key={`customerChangeNote${arrIndex}`}
          props={note}
        />
      );
    });
    return returnNotes;
  };

  const renderCustomerNotes = () => {
    const customerNoteList = singleCustomer.customerNotes.noteList;
    const returnNoteLists: JSX.Element[] = [];

    if (singleCustomer.customerNotes.success === 'false') {
      return <div>FAILED TO GET CUSTOMER NOTES!</div>;
      // eslint-disable-next-line no-else-return
    }

    if (singleCustomer.customerNotes.success === 'empty') {
      return <div>NO NOTES HAVE BEEN ADDED!</div>;
    }

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
                  {renderChangeNoteRow(
                    customerNoteList[noteListNumber].changeNoteList
                  )}
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





  return (
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
              <AddNote
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
  );
}
