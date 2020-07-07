import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import FormBtn from '../../buttonFunctions/buttonClickHandler';

interface FormProps {
  // Need to set this up yet!
}
interface DispatchProps {
  // ...
}


const CustomerAddNote = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;
  console.log('Add Customer Note Props: ', props)
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
        />
      </div>
      <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerAddNote',
  destroyOnUnmount: false
})(CustomerAddNote);
