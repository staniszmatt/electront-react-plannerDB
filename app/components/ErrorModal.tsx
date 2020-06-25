import React from 'react';
import ErrorModalBtn from '../buttonFunctions/buttonClickHandler';

interface Props {
  toggleOpenModalState: () => {};
  openErrorModal: () => {};
  errorOpenState: boolean;
}

export default function ErrorModal(props: Props) {
  console.log("customer component props", props);
  const { toggleOpenModalState, openErrorModal } = props;
  openErrorModal();
  return (
    <div>
      <div>TEST ERROR MODAL</div>
      <ErrorModalBtn
        buttonName="List Customers"
        ClickHandler={toggleOpenModalState}
      />
    </div>
  );
}
