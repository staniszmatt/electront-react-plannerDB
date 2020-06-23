import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import FormYesNoInput from '../../forms/formYesNoInput';
// import FormRadioInput from '../../forms/formRadioInput';
import '../../forms/formInput.css';
import styles from './customerAdd.css';

interface FormProps {
  // Need to set this up yet!
}

interface DispatchProps {
  // ...
}

const CustomerAddFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  console.log("Add Customer Props", props);
  const { handleSubmit, onSubmit } = props;
  return (
    <form
      className={styles['form-main-container']}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Field
          label="Customer Name:"
          component={FormInput}
          name="customerName"
          type="text"
        />
        <Field
          label="Customer Code Name:"
          component={FormInput}
          name="customerCodeName"
          type="text"
        />
        <Field
          className={styles['radio-form']}
          label="General Standards Approved:"
          component={FormYesNoInput}
          name="customerGenStatus"
          type="radio"
        />
        <Field
          className={styles['radio-form']}
          label="RS Standards Approved:"
          component={FormYesNoInput}
          name="customerRSStatus"
          type="radio"
        />
        <Field
          className={styles['radio-form']}
          label="Customer Active:"
          component={FormYesNoInput}
          name="customerActive"
          type="radio"
        />
        <label className={styles['customer-notes-form']}>
          Customer Notes:
          <div>
            <Field
              label="Customer Notes:"
              component="textarea"
              name="customerNote"
              type="textarea"
              aria-multiline
              rows="15"
            />
          </div>
        </label>
      </div>
      <button type="button" onClick={handleSubmit(onSubmit)}>
        Submit
      </button>
    </form>
  );
};

function validate(values) {
  const {
    customerName,
    customerCodeName,
    customerGenStatus,
    customerRSStatus,
    customerActive
  } = values;

  const errors = {};

  if (!customerName) {
    errors.customerName = 'Please Enter a Customer Name!';
  }
  if (!customerCodeName) {
    errors.customerCodeName = 'Please Enter a Customer Name!';
  }
  if (!customerGenStatus) {
    // eslint-disable-next-line prettier/prettier
    errors.customerGenStatus = 'Please Select if General Standard Status is Approved!';
  }
  if (!customerRSStatus) {
    // eslint-disable-next-line prettier/prettier
    errors.customerRSStatus = 'Please Select if RS Standard Status is Approved!';
  }
  if (!customerActive) {
    errors.customerActive = 'Please Select if Customer is Active!';
  }
  return errors;
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerSearchForm',
  validate: validate
})(CustomerAddFormComponent);
