/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormBtn from '../../buttonFunctions/buttonClickHandler';

interface FormProps {
  any: unknown;
}
interface DispatchProps {
  onSubmit: () => {};
  props: {};
}

interface CustomerNoteState {
  // TODO: Change to displaySubmitBtn
  customerNoteDataCheck: boolean;
}

function charCheck(value: string) {
  let changeCharString = value;
  // Disabled pretty checks here, need to keep the \ and quotes the way they are
  changeCharString = changeCharString.replace(/[`]/g, '\"').replace(/[']/g, '\"').replace(/["]/g, '\"');
  return changeCharString;
}

const CustomerAddNote = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;
  const [customerNoteState, setCustomerNoteState] = useState<
    CustomerNoteState | { customerNoteDataCheck: boolean }
  >({ customerNoteDataCheck: false });

  const checkTextArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setCustomerNoteState({
        ...customerNoteState,
        customerNoteDataCheck: true
      });
    } else {
      setCustomerNoteState({
        ...customerNoteState,
        customerNoteDataCheck: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          label="Add Notes:"
          component="textarea"
          name="addCustomerNote"
          type="textarea"
          aria-multiline
          rows="15"
          onChange={checkTextArea}
          normalize={charCheck}
        />
      </div>
      <div>
        {customerNoteState.customerNoteDataCheck && (
          <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
        )}
      </div>
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerAddNote'
})(CustomerAddNote);
