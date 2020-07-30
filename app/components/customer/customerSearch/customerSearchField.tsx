/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import styles from '../../styling/searchForm.css';
import FormInput from '../../forms/formInput';
import '../../forms/formInput.css';

interface FormProps {
  props: any;
}

interface DispatchProps {
  onSubmit: () => {};
}

const CustomerSearchFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;

  function toUpperCase(value: string) {
    return value && value.toUpperCase();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['form-main-container']}>
        <Field
          label="Search For Customer:"
          component={FormInput}
          name="customerSearch"
          type="text"
          format={toUpperCase}
        />
        <button type="button" onClick={handleSubmit(onSubmit)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerSearchForm'
})(CustomerSearchFormComponent);
