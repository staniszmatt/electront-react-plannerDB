import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../../forms/formInput';
import FormBtn from '../../buttonFunctions/buttonClickHandler';
import '../../forms/formInput.css';
import styles from '../customerAdd/customerAdd.css';

interface FormProps {
  // Need to set this up yet!
}
interface DispatchProps {
  // ...
}

interface CheckRadioState {
  customerGenStd: boolean;
  customerRsStd: boolean;
  customerActive: boolean;
}

function toUpperCase(value: string) {
  return value && value.toUpperCase();
}


const CustomerEditFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const [
    checkRadioState,
    setcheckRadioState
  ] = useState<CheckRadioState | null>(props.props.customer);

  const { handleSubmit, onSubmit } = props;

  const radioButtonCheck = (event, field) => {

    console.log('Pre customer Getn Std change Check: ', props.props.customer.customerGenStd);
    console.log("Feild Change, event : ", event);
    console.log('Feild Yes/No: ', field);


    let setBoolean = false;

    if (field === 'yes') setBoolean = true;

    switch (event.target.name) {
      case 'customerGenStatus':
        setcheckRadioState({
          ...checkRadioState,
          customerGenStd: setBoolean
        })
        break;
      case 'customerRSStatus':
        setcheckRadioState({
          ...checkRadioState,
          customerRsStd: setBoolean
        })
        break
      case 'customerActive':
        setcheckRadioState({
          ...checkRadioState,
          customerActive: setBoolean
        })
        break
      default:
    }
  };

  function handleCheck (event) {
    console.log('handle check, event: ', event);
    debugger;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['form-main-container']}>
      <div>
        <Field
          label="Customer Name:"
          component={FormInput}
          name="customerName"
          type="text"
          format={toUpperCase}
          defaultValue={props.props.customer.customerName}
        />
        <Field
          label="Customer Code Name:"
          component={FormInput}
          name="customerCodeName"
          type="text"
          format={toUpperCase}
          defaultValue={props.props.customer.customerCodeName}
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
                checkedValue={checkRadioState.customerGenStd}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="customerGenStatus"
                component={FormInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerGenStd}
                onChange={radioButtonCheck}
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
                checkedValue={checkRadioState.customerRsStd}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="customerRSStatus"
                component={FormInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerRsStd}
                onChange={radioButtonCheck}
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
                checkedValue={checkRadioState.customerActive}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="customerActive"
                component={FormInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerActive}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
      </div>
      <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
    </form>
  );
};

function validate(values) {
  const { customerName, customerCodeName } = values;

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
  return errors;
};

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerEditForm',
  validate,
  destroyOnUnmount: false
})(CustomerEditFormComponent);
