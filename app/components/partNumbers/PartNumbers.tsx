import React from 'react';
import styles from '../styling/pageHeaderBar.css';
import PartNumberBtn from '../buttonFunctions/buttonClickHandler';
import PartNumSearchFormComponent from './partNumberSearch/partNumberSearchField';

interface Props {
  handlePartNumSearchForm: () => {};
  handlePartNumberAddForm: () => {};
  handleListPartNum: () => {};
  props: {
    loadingState: boolean;
  };
}

export default function PartNumbers(props: Props) {
  const {
    handlePartNumSearchForm,
    handlePartNumberAddForm,
    handleListPartNum
  } = props;

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
            ClickHandler={handlePartNumberAddForm}
          />
        </div>
        <PartNumSearchFormComponent onSubmit={handlePartNumSearchForm} />
      </div>
      <div className={styles['page-data']}>
        <div>TESTING PART NUMBER PAGE</div>
      </div>
    </div>
  );
}
