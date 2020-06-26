import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import '../../forms/formInput.css';
import styles from './customerAdd.css';

interface FormProps {
  // Need to set this up yet!
}

interface DispatchProps {
  // ...
}

function toUpperCase(value) {
  return value && value.toUpperCase();
}

const CustomerAddFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  console.log("Add Customer Props", props);
  const { handleSubmit, onSubmit } = props;
  return (
    <form className={styles['form-main-container']}>
      <div>
        <Field
          label="Customer Name:"
          component={FormInput}
          name="customerName"
          type="text"
          format={toUpperCase}
        />
        <Field
          label="Customer Code Name:"
          component={FormInput}
          name="customerCodeName"
          type="text"
          format={toUpperCase}
        />
        <label className={styles["radio-form"]}>
          General Standards Approved:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field
                name="customerGenStatus"
                component={FormInput}
                type="radio"
                value="yes"
              />
            </label>
            <label>
              No
              <Field
                name="customerGenStatus"
                component={FormInput}
                type="radio"
                value="no"
              />
            </label>
          </div>
        </label>
        <label className={styles["radio-form"]}>
          RS Standards Approved:
          <div className={styles['radio-container']}>
            <label>
              Yes
              <Field
                name="customerRSStatus"
                component={FormInput}
                type="radio"
                value="yes"
              />
            </label>
            <label>
              No
              <Field
                name="customerRSStatus"
                component={FormInput}
                type="radio"
                value="no"
              />
            </label>
          </div>
        </label>
        <label className={styles["radio-form"]}>
          Customer Active:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field
                name="customerActive"
                component={FormInput}
                type="radio"
                value="yes"
              />
            </label>
            <label>
              No
              <Field
                name="customerActive"
                component={FormInput}
                type="radio"
                value="no"
              />
            </label>
          </div>
        </label>
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
  console.log("initial validate customer add value", values);
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
  if (customerName) {
    if (customerName.length > 32) {
      errors.customerName = 'Customer name is to long!';
    }
  }
  if (!customerCodeName) {
    errors.customerCodeName = 'Please Enter a Customer Name!';
  }
  if (customerCodeName) {
    if (customerCodeName.length > 6) {
      errors.customerCodeName = 'Code name is too long!';
    }
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
  form: 'customerAddForm',
  validate,
  destroyOnUnmount: false
})(CustomerAddFormComponent);
