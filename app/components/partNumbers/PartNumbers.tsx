/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from '../styling/pageHeaderBar.css';
import PartNumberBtn from '../buttonFunctions/buttonClickHandler';
import PartNumSearchFormComponent from './partNumberSearch/partNumberSearchField';
import PartNumAddFormComponent from './partNumberAddForm/partNumAddForm';

interface Props {
  handlePartNumSearchForm: () => {};
  handlePartNumberAddForm: () => {};
  handleListPartNum: () => {};
  partNumLoadAddPage: () => {};
  part
  partNumbers: {
    loadingState: boolean;
    loadPartAddPage: boolean;
  };
}

export default function PartNumbers(props: Props) {
  const {
    handlePartNumSearchForm,
    handlePartNumberAddForm,
    handleListPartNum,
    partNumLoadAddPage
  } = props;

  console.log("load add page state: ", props.partNumbers.loadPartAddPage)

  console.log('partNumber Props:', props);

  return (
    <div className={styles.container}>
      <div className={styles['page-head-container']}>
        <div className={styles.btnContainer}>
          <PartNumberBtn
            buttonName="List Part Numbers"
            ClickHandler={handleListPartNum}
          />
          <PartNumberBtn
            buttonName="Add Part Number"
            ClickHandler={partNumLoadAddPage}
          />
        </div>
        <PartNumSearchFormComponent onSubmit={handlePartNumSearchForm} />
      </div>
      <div className={styles['page-data']}>
        {props.partNumbers.loadPartAddPage && (
          <PartNumAddFormComponent onSubmit={handlePartNumberAddForm} />
        )}
      </div>
    </div>
  );
}
