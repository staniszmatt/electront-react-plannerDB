/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import styles from '../../customer/customerSearch/customerSearch.css';
import FormInput from '../../forms/formInput';
import '../../forms/formInput.css';

interface FormProps {
  props: any;
}

interface DispatchProps {
  onSubmit: () => {};
}

const PartNumSearchFormComponent = (
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
          label="Search Part Number:"
          component={FormInput}
          name="partNumSearch"
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
  form: 'partNumSearchForm'
})(PartNumSearchFormComponent);
