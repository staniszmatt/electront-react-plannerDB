/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormBtn from './buttonFunctions/buttonClickHandler';
import FormTextArea from './forms/formTextArea';

interface FormProps {
  any: unknown;
}
interface DispatchProps {
  onSubmit: () => {};
  props: {};
}

interface NoteState {
  // TODO: Change to displaySubmitBtn
  NoteDataCheck: boolean;
}

function charCheck(value: string) {
  let changeCharString = value;
  // Disabled pretty checks here, need to keep the \ and quotes the way they are
  changeCharString = changeCharString.replace(/[`]/g, '\"').replace(/[']/g, '\"').replace(/["]/g, '\"');
  return changeCharString;
}

const AddNote = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;
  const [NoteState, setNoteState] = useState<
    NoteState | { NoteDataCheck: boolean }
  >({ NoteDataCheck: false });

  const checkTextArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') {
      setNoteState({
        ...NoteState,
        NoteDataCheck: true
      });
    } else {
      setNoteState({
        ...NoteState,
        NoteDataCheck: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Field
          label="Add Notes:"
          component={FormTextArea}
          name="addNote"
          type="textarea"
          aria-multiline
          rows="15"
          onChange={checkTextArea}
          normalize={charCheck}
        />
      </div>
      <div>
        {NoteState.NoteDataCheck && (
          <FormBtn props={props} buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
        )}
      </div>
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'addNote'
})(AddNote);
