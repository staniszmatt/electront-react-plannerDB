import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormBtn from '../../buttonFunctions/buttonClickHandler';

interface FormProps {
  // Need to set this up yet!
}
interface DispatchProps {
  // ...
}

interface CustomerNoteState {
  customerNoteDataCheck: boolean;
}


const CustomerAddNote = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  console.log('edit customer note props', props);

  const { handleSubmit, onSubmit } = props;
  const [customerNoteState, setCustomerNoteState] = useState<
    CustomerNoteState | { customerNoteDataCheck: boolean }
  >({ customerNoteDataCheck: false });

  const checkTextArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.nativeEvent.data !== null) {
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

  console.log('Add Customer Note Props: ', props);
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
          defaultValue={props.props.noteText}
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
  form: 'customeEditNote',
  destroyOnUnmount: false
})(CustomerAddNote);
