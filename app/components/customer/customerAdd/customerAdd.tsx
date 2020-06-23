import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
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
              <Field name="genSTD" component={FormInput} type="radio" value="yes" />
            </label>
            <label>
              No
              <Field name="genSTD" component={FormInput} type="radio" value="no" />
            </label>
          </div>
        </label>
        <label className={styles["radio-form"]}>
          RS Standards Approved:
          <div className={styles["radio-container"]}>
            <label>
              Yes
              <Field
                name="rsStd"
                component={FormInput}
                type="radio"
                value="yes"
              />
            </label>
            <label>
              No
              <Field
                name="rsStd"
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
              <Field name="customerActive" component={FormInput} type="radio" value="yes" />
            </label>
            <label>
              No
              <Field name="customerActive" component={FormInput} type="radio" value="no" />
            </label>
          </div>
        </label>
        <label className={styles['customer-notes-form']}>
          Customer Notes:
          <div>
            <Field
              label="Customer Notes:"
              component="textarea"
              name="customerNotes"
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

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerSearchForm'
})(CustomerAddFormComponent);
