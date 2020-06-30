import React from 'react';
import CustomerNoteRow from './customerSingleNotes';
import EditCustomerBtn from '../../buttonFunctions/buttonClickHandler';
import styles from './customerSingle.css';
import booleanToStringYesNo from '../../../helpFunctions/booleanToStringYesNo';

interface Props {
  props: {
    customer: {
      customerName: string;
      customerCodeName: string;
      customerGenStd: boolean;
      customerRsStd: boolean;
      customerActive: boolean;
    };
    customerNotes: {
      noteList: [];
    }
  }
}

// TODO: REMOVE AFTER TESTING, pre-setup for calling edit customer page
function editCustomer() {
  console.log('Display Single Customer');
}

export default function CustomerHeadTable(props: Props) {
  const renderRow = noteArray => {
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

  const renderCustomerNotes = () => {
    const customerNoteList = props.props.customerNotes.noteList;
    const returnNoteLists: JSX.Element[] = [];

    Object.keys(customerNoteList).forEach((key, objIndex) => {
      const returnNotes = (
        // eslint-disable-next-line react/no-array-index-key
        <div
          key={`customerNotes${objIndex}`}
          className={styles['single-customer-note-wrapper']}
        >
          <div>
            <div>{`Note:${objIndex + 1}`}</div>
          </div>

          <div>{renderRow(customerNoteList[key])}</div>
        </div>
      );
      returnNoteLists.push(returnNotes);
    });
    return returnNoteLists;
  }

  const renderBooleanData = () => {
    const {
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

  console.log('Single Customer Display Component props', props);
  return (
    <div className={styles["main-single-customer"]}>
      <div>
        <EditCustomerBtn
          buttonName="Edit Customer"
          ClickHandler={editCustomer}
        />
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
            <div>Change Note History:</div>
          </div>
          <div>display data here!</div>
        </div>
      </div>




      <div className={styles["single-customer-notes"]}>
        <div>
          <div>
            <div>
              <div>Customer Notes:</div>
            </div>
            <div>{renderCustomerNotes()}</div>
          </div>
        </div>
      </div>




    </div>
  );
}
