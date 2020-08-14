/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import FormInput from '../forms/formInput';
import FormYesNo from '../forms/formYesNo';
import FormTextArea from '../forms/formTextArea';
import FormBtn from '../buttonFunctions/buttonClickHandler';
import '../forms/formInput.css';
import styles from './customerAdd.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FormProps {}
interface DispatchProps {
  onSubmit: () => {};
}

function toUpperCase(value: string) {
  return value && value.toUpperCase();
}

function charCheck(value: string) {
  let changeCharString = value;
  // Disabled pretty checks here, need to keep the \ and quotes the way they are
  changeCharString = changeCharString.replace(/[`]/g, '\"').replace(/[']/g, '\"').replace(/["]/g, '\"');
  return changeCharString;
}

const CustomerAddFormComponent = (
  props: DispatchProps & InjectedFormProps<FormProps, DispatchProps>
) => {
  const { handleSubmit, onSubmit } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles['form-main-container']}
    >
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

        <Field
          label="General Standards Approved:"
          name="customerGenStatus"
          component={FormYesNo}
          type="radio"
        />

        <Field
          label="RS Standards Approved:"
          name="customerRSStatus"
          component={FormYesNo}
          type="radio"
        />

        <Field
          label="Customer Active:"
          name="customerActive"
          component={FormYesNo}
          type="radio"
        />

        <Field
          label="Customer Notes:"
          name="customerNote"
          component={FormTextArea}
          rows="15"
          normalize={charCheck}
        />

      </div>
      <FormBtn buttonName="Submit" ClickHandler={handleSubmit(onSubmit)} />
    </form>
  );
};

interface Values {
  customerName: string;
  customerCodeName: string;
  customerGenStatus: string;
  customerRSStatus: string;
  customerActive: string;
}

function validate(values: Values) {
  console.log('add customer validation check', values)
  const {
    customerName,
    customerCodeName,
    customerGenStatus,
    customerRSStatus,
    customerActive
  } = values;

  const errors: any = {};

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
      errors.customerCodeName = 'Code name is too long! 6 Characters or less.';
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
}

export default reduxForm<FormProps, DispatchProps>({
  form: 'customerAddForm',
  validate,
  destroyOnUnmount: false
})(CustomerAddFormComponent);
