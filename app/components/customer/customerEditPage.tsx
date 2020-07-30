/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../forms/formInput';
import FormRadioInput from '../forms/formRadioInput';
import FormBtn from '../buttonFunctions/buttonClickHandler';
import '../forms/formInput.css';
import styles from './customerEditPage.css';

interface FormProps {
  props: {
    customer: {};
  };
  customerName: string | null;
  customerCodeName: string | null;
  customerGenStd: boolean | null;
  customerRsStd: boolean | null;
  customerActive: boolean | null;
}

interface DispatchProps {
  onSubmit: () => {};
  props: {
    customer: {
      customerName: string;
      customerCodeName: string;
      customerGenStd: boolean;
      customerRsStd: boolean;
      customerActive: boolean;
    };
  };
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
  // Preset the value for the customer name only.
  // The disabled no-param-reassign was disabled, From what I can tell we are allowed to reassign the initial values for redux-form here.
  // eslint-disable-next-line no-param-reassign
  props.initialValues.customerName = props.props.customer.customerName;

  const [
    checkRadioState,
    setCheckRadioState
    // eslint-disable-next-line react/destructuring-assignment
  ] = useState<
    | CheckRadioState
    | {
        customerGenStd: boolean;
        customerRsStd: boolean;
        customerActive: boolean;
      }
  >(props.props.customer);

  const { handleSubmit, onSubmit } = props;

  const radioButtonCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    let setBoolean = false;

    if (event.target.value === 'yes') setBoolean = true;

    switch (event.target.name) {
      case 'customerGenStd':
        setCheckRadioState({
          ...checkRadioState,
          customerGenStd: setBoolean
        });
        break;
      case 'customerRsStd':
        setCheckRadioState({
          ...checkRadioState,
          customerRsStd: setBoolean
        });
        break;
      case 'customerActive':
        setCheckRadioState({
          ...checkRadioState,
          customerActive: setBoolean
        });
        break;
      default:
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-main-container']}
    >
      <div>
        <Field
          label="Customer Name:"
          format={toUpperCase}
          component={FormInput}
          name="customerName"
          type="text"
          defaultValue={props.props.customer.customerName}
          disabled={true}
        />
        <Field
          label="Customer Code Name:"
          format={toUpperCase}
          component={FormInput}
          name="customerCodeName"
          type="text"
          defaultValue={props.props.customer.customerCodeName}
        />
        <label>
          General Standards Approved:
          <div>
            <label>
              Yes
              <Field
                name="customerGenStd"
                component={FormRadioInput}
                type="radio"
                value="yes"
                checkedValue={checkRadioState.customerGenStd}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="customerGenStd"
                component={FormRadioInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerGenStd}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
        <label>
          RS Standards Approved:
          <div>
            <label>
              Yes
              <Field
                name="customerRsStd"
                component={FormRadioInput}
                type="radio"
                value="yes"
                checkedValue={checkRadioState.customerRsStd}
                onChange={radioButtonCheck}
              />
            </label>
            <label>
              No
              <Field
                name="customerRsStd"
                component={FormRadioInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerRsStd}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
        <label>
          Customer Active:
          <div>
            <label>
              Yes
              <Field
                name="customerActive"
                component={FormRadioInput}
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
                component={FormRadioInput}
                type="radio"
                value="no"
                checkedValue={!checkRadioState.customerActive}
                onChange={radioButtonCheck}
              />
            </label>
          </div>
        </label>
      </div>
      <div>
        <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

function validate(values: FormProps) {
  const { customerName, customerCodeName } = values;
  const errors = {
    customerName: '',
    customerCodeName: ''
  };

  if (customerName === null || customerCodeName === null) {
    return;
  }

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
}

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerEditForm',
  validate,
  destroyOnUnmount: false,
  initialValues: {
    customerName: null,
    customerCodeName: null,
    customerGenStd: null,
    customerRsStd: null,
    customerActive: null
  }
})(CustomerEditFormComponent);
