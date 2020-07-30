/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import styles from '../styling/pageHeaderBar.css';
import PartNumberBtn from '../buttonFunctions/buttonClickHandler';
import PartNumSearchFormComponent from './partNumberSearch/partNumberSearchField';
import PartNumberErrorDisplay from '../../errorComponents/ErrorComponent';
import PartNumberListHeader from './partNumberList/partNumberListHeader';
import LoadingScreen from '../LoadingDisplay';
import PartNumAddFormComponent from './partNumberAddForm/partNumAddForm';
import PartNumberSingleDisplay from './partNumberSingle/partNumberSingleDisplay';
import PartNumberEditFormPage from './partNumberEdit/partNumberEditPage';

interface Props {
  handlePartNumSearchForm: () => {};
  handlePartNumberAddForm: () => {};
  handleListPartNum: () => {};
  partNumLoadAddPage: () => {};
  handleEditPartNumberSubmit: () => {};
  partNumbers: {
    errorState: boolean;
    error: {};
    loadingState: boolean;
    loadPartAddPage: boolean;
    loadSinglePartNumberPage: boolean;
    loadPartNumberListPage: boolean;
    loadPartNumberEditPage: boolean;
    partNumberList: {
      list: [];
    };
    singlePartNumber: {} | any;
  };
}

export default function PartNumbers(props: Props) {
  const {
    handlePartNumSearchForm,
    handlePartNumberAddForm,
    handleEditPartNumberSubmit,
    handleListPartNum,
    partNumLoadAddPage
  } = props;

  return (
    <div className={styles.container}>
      {props.partNumbers.loadingState && <LoadingScreen />}
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
        {props.partNumbers.errorState && (
          <PartNumberErrorDisplay props={props.partNumbers.error} />
        )}
        {props.partNumbers.loadPartAddPage && (
          <PartNumAddFormComponent onSubmit={handlePartNumberAddForm} />
        )}
        {props.partNumbers.loadSinglePartNumberPage && (
          <PartNumberSingleDisplay />
        )}
        {props.partNumbers.loadPartNumberListPage && (
          <PartNumberListHeader props={props.partNumbers.partNumberList.list} />
        )}

        {props.partNumbers.loadPartNumberEditPage && (
          <PartNumberEditFormPage
            onSubmit={handleEditPartNumberSubmit}
            props={props.partNumbers.singlePartNumber}
          />
        )}
      </div>
    </div>
  );
}
