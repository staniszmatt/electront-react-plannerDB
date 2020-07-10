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

  const { handleSubmit, onSubmit } = props;
  const [customerNoteState, setCustomerNoteState] = useState<
    CustomerNoteState | { customerNoteDataCheck: boolean }
  >({ customerNoteDataCheck: false });
  // State is for hiding submit button if nothing is changed or text field is empty.
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
          name="updateCustomerNote"
          type="textarea"
          aria-multiline
          rows="15"
          onChange={checkTextArea}
          defaultValue={props.props.noteText}
          onSubmit={(values, _value, props) => {}}
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
  form: 'customerEditNote'
})(CustomerAddNote);
// TODO: Might be able to do this to setup some error handling
// onSubmit={(values, _, props)=>{
//   console.log("onSubmit props: ", props.props.noteID);
//   console.log('Values: ',values);
// }}
