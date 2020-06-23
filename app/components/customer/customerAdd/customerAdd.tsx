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
        <label className={styles["radio-form"]}>
          General Standards Approved:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field name="General Standards Approved" component={FormInput} type="radio" value="yes" />
            </label>
            <label>
              No
              <Field name="General Standards Approved" component={FormInput} type="radio" value="no" />
            </label>
          </div>
        </label>
        <label className={styles["radio-form"]}>
          RS Standards Approved:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field name="RS Standards Approved" component={FormInput} type="radio" value="yes" />
            </label>
            <label>
              No
              <Field name="RS Standards Approved" component={FormInput} type="radio" value="no" />
            </label>
          </div>
        </label>
        <label className={styles["radio-form"]}>
          Customer Active:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field name="Customer Active" component={FormInput} type="radio" value="yes" />
            </label>
            <label>
              No
              <Field name="Customer Active" component={FormInput} type="radio" value="no" />
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
