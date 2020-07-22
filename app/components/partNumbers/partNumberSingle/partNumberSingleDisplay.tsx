/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import {
  // handleEditCustomerForm,
  // handleAddCustomerNote,
  // handleEditCustomerNote,
  // handleDeleteCustomerNote,
  // handleDeleteCustomer
} from '../../../actions/partNumbersActions';
import NoteList from '../../notesList';
import {
  toggleWarningModalState,
  toggleModalState
} from '../../../actions/modalActions';
import { partNumbersStateType } from '../../../reducers/types';
import AddCustomerNote from '../customerNotes/addCustomerNote';
import EditCustomerNote from '../customerNotes/editCustomerNote';
import Btn from '../../buttonFunctions/buttonClickHandler';
import styles from '../../customer/customerSingle/customerSingleDisplay.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';
import CustomerChangeNoteRow from '../../singleChangeNote';

interface Props {
  // handleEditCustomerForm: (customerInfo: string) => {};
  // handleAddCustomerNote: () => {};
  // handleEditCustomerNote: () => {};
  // handleDeleteCustomerNote: (deleteProps: {}) => {};
  // toggleWarningModalState: (warningModalResp: {}) => {};
  // handleDeleteCustomer: () => {};
  // toggleModalState: () => {};
  props: {
    partNumberNotes: {
      noteList: {
        [id: number]: {
          changeNoteList: [];
        }
      };
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
      // handleEditCustomerForm,
      // handleAddCustomerNote,
      // handleEditCustomerNote,
      // handleDeleteCustomerNote,
      // handleDeleteCustomer,
      // toggleWarningModalState,
      // toggleModalState,
      // reset
    },
    dispatch
  );
}

function PartNumberSingleDisplay(props: Props) {
  console.log("Single part number page, props:", props);

  const partNumberInfo = props.props.singlePartNumber;
  const partNumberChangeNoteList = props.props.singlePartNumber.changeNoteList.list;
  const partNumberNoteList = props.props.partNumberNotes.noteList;


  // const {
    // handleEditCustomerForm,
    // handleAddCustomerNote,
    // handleEditCustomerNote,
    // handleDeleteCustomerNote,
    // handleDeleteCustomer,
    // toggleWarningModalState,
    // toggleModalState
  // } = props;
  // const singlePartNumber = props.partNumbers.singlePartNumberInfo;
  // useState setup with typescript defaults
  // const [noteDisplayState, setNoteDisplayState] = useState<{
  //   listNotes: boolean;
  //   addNote: boolean;
  //   editNote: boolean;
  //   customerNote: {
  //     noteID: number | null;
  //     noteText: string;
  //   };
  // }>({
  //   listNotes: true,
  //   addNote: false,
  //   editNote: false,
  //   customerNote: {
  //     noteID: null,
  //     noteText: ''
  //   }
  // });

  // const addCustomerNote = () => {
  //   setNoteDisplayState({
  //     ...noteDisplayState,
  //     listNotes: false,
  //     addNote: true,
  //     editNote: false,
  //     customerNote: {
  //       noteID: null,
  //       noteText: ''
  //     }
  //   });
  // };

  // const editCustomerNote = (
  //   _event: {},
  //   editNoteProps: {
  //     props: {
  //       noteID: number;
  //       noteText: string;
  //     };
  //   }
  // ) => {
  //   setNoteDisplayState({
  //     ...noteDisplayState,
  //     listNotes: false,
  //     addNote: false,
  //     editNote: true,
  //     customerNote: {
  //       noteID: editNoteProps.props.noteID,
  //       noteText: editNoteProps.props.noteText
  //     }
  //   });
  // };

  // const cancelNote = () => {
  //   // Clear forms if canceled.
  //   reset('customerEditNote');
  //   reset('customerAddNote');

  //   setNoteDisplayState({
  //     ...noteDisplayState,
  //     listNotes: true,
  //     addNote: false,
  //     editNote: false,
  //     customerNote: {
  //       noteID: null,
  //       noteText: ''
  //     }
  //   });
  // };

  const renderChangeNoteRow = (list: { forEach: Function }) => {
    const returnNotes: JSX.Element[] = [];

    list.forEach((note: {}, arrIndex: number) => {
      returnNotes.push(
        <CustomerChangeNoteRow
          // eslint-disable-next-line react/no-array-index-key
          key={`changeNote${arrIndex}`}
          // @ts-ignore: Type '{}' is missing
          props={note}
        />
      );
    });
    return returnNotes;
  };

  // const handleDeleteNoteClick = (_event: {}, deleteProps: {}) => {
  //   const warningModalResp = {
  //     warningMsg: 'Do you really want to delete this customer note?',
  //     actionFunction: () => {
  //       handleDeleteCustomerNote(deleteProps);
  //     },
  //     closeModal: () => {
  //       toggleModalState();
  //     }
  //   };
  //   toggleWarningModalState(warningModalResp);
  // };

  // const renderCustomerNotes = () => {
  //   debugger;
  //   const customerNoteList = singleCustomer.customerNotes.noteList;
  //   const returnNoteLists: JSX.Element[] = [];

  //   if (singleCustomer.customerNotes.success === 'false') {
  //     return <div>FAILED TO GET CUSTOMER NOTES!</div>;
  //     // eslint-disable-next-line no-else-return
  //   }

  //   if (singleCustomer.customerNotes.success === 'empty') {
  //     return <div>NO NOTES HAVE BEEN ADDED!</div>;
  //   }

  //   Object.keys(customerNoteList).forEach(
  //     (noteListKey: string, objIndex: number) => {
  //       const noteListNumber = parseInt(noteListKey, 10);
  //       const returnNotes = (
  //         // eslint-disable-next-line react/no-array-index-key
  //         <div
  //           // eslint-disable-next-line react/no-array-index-key
  //           key={`customerNotes${objIndex}`}
  //           id={`customerNoteID-${noteListKey}`}
  //           className={styles['single-customer-note-wrapper']}
  //         >
  //           <div>
  //             <div>{`Note:${objIndex + 1}`}</div>
  //             <div>
  //               <Btn
  //                 props={{
  //                   noteID: noteListKey,
  //                   noteText: customerNoteList[noteListNumber].customerNoteText
  //                 }}
  //                 buttonName="Edit Note"
  //                 ClickHandler={editCustomerNote}
  //               />
  //             </div>
  //             <div className={styles['delete-btn']}>
  //               <Btn
  //                 props={noteListKey}
  //                 buttonName="Delete Note"
  //                 ClickHandler={handleDeleteNoteClick}
  //               />
  //             </div>
  //           </div>
  //           <div>
  //             <div>
  //               <textarea disabled={true}>
  //                 {customerNoteList[noteListNumber].customerNoteText}
  //               </textarea>
  //             </div>
  //           </div>
  //           <div>
  //             <div>
  //               <div>
  //                 {renderChangeNoteRow(
  //                   customerNoteList[noteListNumber].changeNoteList
  //                 )}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //       returnNoteLists.push(returnNotes);
  //     }
  //   );
  //   return returnNoteLists;
  // };

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
      <div className={styles['single-customer-status']}>
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
  const editCustomer = () => {
    console.log("edit partNumber");
    // handleEditCustomerForm(singleCustomer.customer.customerName);
  };

  const deleteCustomer = () => {
    console.log('Delete PartNumber');
    // const warningModalResp = {
    //   warningMsg: 'Do you really want to delete this customer note?',
    //   actionFunction: () => {
    //     handleDeleteCustomer();
    //   },
    //   closeModal: () => {
    //     toggleModalState();
    //   }
    // };
    // toggleWarningModalState(warningModalResp);
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

      {/** TODO: Setup Notes Section here! */}

    </div>
  );

}
// TODO: Figure out how to fix this type script error or fix typescript rule.
// @ts-ignore: Argument of type '(props: Props)'
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartNumberSingleDisplay);
