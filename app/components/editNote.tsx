/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormBtn from './buttonFunctions/buttonClickHandler';
import FormTextArea from './forms/formTextArea';

interface FormProps {
  any: unknown;
}
interface DispatchProps {
  onSubmit: () => {};
  props: {
    noteText: string;
  };
}

interface CustomerNoteState {
  // TODO: Change to displaySubmitBtn
  noteDataCheck: boolean;
}

function charCheck(value: string) {
  let changeCharString = value;
  // Disabled pretty checks here, need to keep the \ and quotes the way they are
  changeCharString = changeCharString.replace(/[`]/g, '\"').replace(/[']/g, '\"').replace(/["]/g, '\"');
  return changeCharString;
}

const EditNote = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const { noteText } = props.props;
  const [noteState, setCustomerNoteState] = useState<
    CustomerNoteState | { noteDataCheck: boolean }
  >({ noteDataCheck: false });
  // State is for hiding submit button if nothing is changed or text field is empty.
  const checkTextArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setCustomerNoteState({
        ...noteState,
        noteDataCheck: true
      });
    } else {
      setCustomerNoteState({
        ...noteState,
        noteDataCheck: false
      });
    }
  };

  // component={FormTextArea}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          label="Edit Note:"
          component={FormTextArea}
          name="updateNote"
          type="textarea"
          aria-multiline
          rows="15"
          onChange={checkTextArea}
          defaultValue={noteText}
          normalize={charCheck}
        />
      </div>
      <div>
        {noteState.noteDataCheck && (
          <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
        )}
      </div>
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'editNote'
})(EditNote);
