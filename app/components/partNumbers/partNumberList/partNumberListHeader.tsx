/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PartNumberRow from './partNumberListRow';
import styles from './partNumberList.css';

interface Length {
  length: number;
}

interface Props {
  props:
    | [
        {
          [index: number]: {
            PartNumber: {};
          };
        }
      ]
    | Length;
}

interface PartNumber {
  id: number;
  partNumberName: string;
  partNumberMaterial: string;
  partNumberSerialNumberRequired: boolean;
  partNumberSetForProduction: boolean;
}

export default function CustomerHeadTable(props: Props) {
  console.log('list part number header, props', props);
  // Stop running if nothing was passed
  if (props.props === undefined || props.props.length === 0) {
    return <div>Did Note Get A List of Part Numbers To Display!</div>;
  }
  const renderRows = () => {
    const data: any = props.props;
    const partNumberRow = data.map((partNumber: PartNumber) => {
      return <PartNumberRow key={partNumber.id} props={partNumber} />;
    });
    return partNumberRow;
  };

  return (
    <table className={styles['main-table']}>
      <caption>Part Number List</caption>
      <thead>
        <tr>
          <th>Part Number</th>
          <th>Material Type</th>
          <th>Serial Number Required</th>
          <th>Set For Production</th>
        </tr>
      </thead>
      <tbody className={styles['t-body']}>{renderRows()}</tbody>
    </table>
  );
}
