import React from 'react';
import { Field, reduxForm, InjectedFormProps, submit } from 'redux-form';
import styles from './customerSearch.css';
import FormInput from '../../forms/formInput';
import '../../forms/formInput.css';
import './customerSearch.css';

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
      <div className={styles["form-main-container"]}>
        <Field
          label="Search For Customer"
          component={FormInput}
          name="customerSearch"
          type="text"
        />
        <button type="button" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm<IFormProps, IDispatchProps>({
  form: 'customerSearchForm'
})(CustomerSearchFormComponent);
