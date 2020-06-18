import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';

interface FormProps {
  // Need to set this up yet!
}

interface DispatchProps {
  // ...
}

const CustomerSearchFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  console.log("Feild Props", props);
  const { handleSubmit, onSubmit } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-main-container">
        <Field
          label="Search For Customer"
          component={FormInput}
          name="customerSearch"
          type="text"
        />
        <button className="btn" type="button" onSubmit={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm<IFormProps, IDispatchProps>({
  form: 'customerSearchForm'
})(CustomerSearchFormComponent);
